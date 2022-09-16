import { Client } from "@microsoft/microsoft-graph-client";
import { createMicrosoftGraphClient, TeamsFx } from "@microsoft/teamsfx";

import { FxContext } from "../components/singletonContext";
import Events from "../data/Events.json";
import Files from "../data/Files.json";
import Tasks from "../data/Task.json";
import Contacts from "../data/Contacts.json";
import ContactsModel from "../model/ContactModel";
import EventsModel from "../model/EventsModel";
import FilesModel from "../model/FilesModel";
import TaskModel from "../model/TaskModel";
import { generateTeamsUrl } from "./GetFiles";
import { scope } from "./login";

const CALENDAR_API_URL =
  "/me/events?$top=2&$select=subject,bodyPreview,organizer,attendees,start,end,location,onlineMeeting";

const FILES_API_URL =
  "/me/drive/recent?$top=5&$select=name,webUrl,createdBy,lastModifiedBy,remoteItem";

export const getTask = (): TaskModel[] => Tasks;

export const getEvents = (): EventsModel[] => Events;

export const getFiles = (): FilesModel[] => Files;

export const getContacts = (): ContactsModel[] => Contacts;

export async function acquireData() {
  try {
    var teamsfx = FxContext.getInstance().getTeamsFx();
    const token = await teamsfx.getCredential().getToken(scope);
    let tokenstr = "";
    if (token) tokenstr = token.token;
    teamsfx.setSsoToken(tokenstr);

    const graphClient: Client = createMicrosoftGraphClient(teamsfx, scope);

    // query calendar
    const calendars = await graphClient.api(CALENDAR_API_URL).get();
    const myCalendars = calendars["value"];
    let calendarRes: EventsModel[] = [];
    for (const obj of myCalendars) {
      const tmp: EventsModel = {
        startTime: obj["start"],
        endTime: obj["end"],
        title: obj["subject"],
        location: obj["location"]["displayName"],
        url:
          obj["onlineMeeting"] && obj["onlineMeeting"]["joinUrl"]
            ? obj["onlineMeeting"]["joinUrl"]
            : undefined,
      };
      calendarRes.push(tmp);
    }

    // query task
    const taskResponse = await graphClient.api("/me/todo/lists").get();
    const taskList = taskResponse["value"][0];
    const todoTaskListId: string = taskList["id"];
    const tasks = await graphClient
      .api("/me/todo/lists/" + todoTaskListId + "/tasks/")
      .get();
    const tasksInfo = tasks["value"];
    let taskResult: TaskModel[] = [];
    for (const obj of tasksInfo) {
      const tmp: TaskModel = {
        id: obj["id"],
        name: obj["title"],
        status: obj["status"],
        importance: obj["importance"],
        content: obj["content"],
      };
      taskResult.push(tmp);
    }

    // query documents
    const files = await graphClient.api(FILES_API_URL).get();
    const filesInfo = files["value"];
    let filesResult: FilesModel[] = [];
    for (const obj of filesInfo) {
      const tmp: FilesModel = {
        name: obj["name"],
        createdBy: obj["remoteItem"]["createdBy"]["user"]["displayName"],
        lastModifiedBy:
          obj["remoteItem"]["lastModifiedBy"]["user"]["displayName"],
        createdDateTime: obj["remoteItem"]["createdDateTime"],
        lastModifiedDateTime: obj["remoteItem"]["lastModifiedDateTime"],
        type: obj["remoteItem"]["file"]["mimeType"],
        weburl: obj["remoteItem"]["webUrl"],
        webDavurl: obj["remoteItem"]["webDavUrl"],
        teamsurl: generateTeamsUrl(obj),
      };
      filesResult.push(tmp);
    }

    return {
      tasks: taskResult,
      events: calendarRes,
      files: filesResult,
    };
  } catch (e) {
    alert(e);
  }
}

export async function addTaskWithData(title: string) {
  try {
    let teamsfx: TeamsFx;
    teamsfx = FxContext.getInstance().getTeamsFx();
    const token = await teamsfx?.getCredential().getToken(scope);
    let tokenstr = "";
    if (token) tokenstr = token.token;
    teamsfx.setSsoToken(tokenstr);

    const graphClient: Client = createMicrosoftGraphClient(teamsfx, scope);
    const tasklists = await graphClient.api("/me/todo/lists").get();
    const myFirstTaskList = tasklists["value"][0];
    const todoTaskListId: string = myFirstTaskList["id"];

    let postResponse = await graphClient
      .api("/me/todo/lists/" + todoTaskListId + "/tasks")
      .post({ title: title });

    const tasks = await graphClient
      .api("/me/todo/lists/" + todoTaskListId + "/tasks/")
      .get();
    const tasksInfo = tasks["value"];
    let taskResult: TaskModel[] = [];
    for (const obj of tasksInfo) {
      const tmp: TaskModel = {
        name: obj["title"],
        status: obj["status"],
        importance: obj["importance"],
        content: obj["content"],
      };
      taskResult.push(tmp);
    }
    return taskResult;
  } catch (e) {
    alert(e);
  }
}
