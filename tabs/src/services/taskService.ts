import { createMicrosoftGraphClient, TeamsFx } from "@microsoft/teamsfx";
import { Client } from "@microsoft/microsoft-graph-client";
import { TaskModel } from "../models/taskModel";
import { FxContext } from "../internal/singletonContext";

export async function getTasks(): Promise<TaskModel[]> {
  let teamsfx: TeamsFx;
  try {
    teamsfx = FxContext.getInstance().getTeamsFx();
    const graphClient: Client = createMicrosoftGraphClient(teamsfx, ["Tasks.ReadWrite"]);
    const tasklists = await graphClient.api("/me/todo/lists").get();
    const myFirstTaskList = tasklists["value"][0];
    const todoTaskListId: string = myFirstTaskList["id"];
    const resp = await graphClient.api(`/me/todo/lists/${todoTaskListId}/tasks?$top=3`).get();
    const tasksInfo = resp["value"];
    let tasks: TaskModel[] = [];
    for (const obj of tasksInfo) {
      const tmp: TaskModel = {
        id: obj["id"],
        name: obj["title"],
        status: obj["status"],
        importance: obj["importance"],
        content: obj["content"],
      };
      tasks.push(tmp);
    }
    return tasks;
  } catch (e) {
    throw e;
  }
}

export async function addTask(title: string): Promise<TaskModel[]> {
  try {
    let teamsfx: TeamsFx;
    teamsfx = FxContext.getInstance().getTeamsFx();

    const graphClient: Client = createMicrosoftGraphClient(teamsfx, ["Tasks.ReadWrite"]);
    const tasklists = await graphClient.api("/me/todo/lists").get();
    const myFirstTaskList = tasklists["value"][0];
    const todoTaskListId: string = myFirstTaskList["id"];
    await graphClient.api("/me/todo/lists/" + todoTaskListId + "/tasks").post({ title: title });
    const tasks = await graphClient.api(`/me/todo/lists/${todoTaskListId}/tasks`).get();
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
    return taskResult;
  } catch (e) {
    throw e;
  }
}

export function openTaskApp() {
  window.open(
    "https://teams.microsoft.com/l/app/0d5c91ee-5be2-4b79-81ed-23e6c4580427?source=app-details-dialog",
    "_blank"
  );
}
