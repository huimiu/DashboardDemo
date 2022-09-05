import "../style/cardLayout.css";

import { Escape } from "@fluent-blocks/react";
import { WidgetPropsOrElement } from "@fluent-blocks/react/types/blocks/Card/exemplars/Widget";
import { Button, Label, Text } from "@fluentui/react-components";
import { ArrowRight16Filled } from "@fluentui/react-icons";

import EventsModel from "../model/EventsModel";
import { getEvents } from "../service/Requests";

export default function Events(): WidgetPropsOrElement {
  const events = getEvents();
  return {
    widget: {
      title: "Your upcoming events",
      label: "events-widget",
      tabs: [
        {
          tab: {
            label: "events-content",
          },
          panel: [
            <Escape contentMeetsAccessibilityAndDesignStandards>
              <div className="card-content">
                <div className="events-container">
                  <div className="summary">
                    <Label size="small" weight="semibold">
                      Aug 31, 2022
                    </Label>
                    <Label size="small">
                      You have 4 meetings today. The upcoming events
                    </Label>
                  </div>
                  <div className="events-list">
                    {events?.map((event: EventsModel, i) => {
                      return (
                        <div className="events-item">
                          <div className="events-item-left">
                            <div className="divider" />
                            <div className="events-content">
                              <Text
                                className="events-title"
                                size={500}
                                key={event.id?.concat("-title")}
                              >
                                {event.title}
                              </Text>
                              <Text
                                className="events-subtitle"
                                size={400}
                                key={event.id?.concat("-time")}
                              >
                                {event.startTime + "-" + event.endTime}
                              </Text>
                              {event.location && (
                                <Text
                                  className="events-location"
                                  size={300}
                                  key={event.id?.concat("-loc")}
                                >
                                  {event.location}
                                </Text>
                              )}
                            </div>
                          </div>
                          <div className="events-item-right">
                            {i == 0 && (
                              <Button
                                className="events-button"
                                appearance="primary"
                                key={event.id?.concat("-button")}
                              >
                                Join
                              </Button>
                            )}
                            {i > 0 && (
                              <Button
                                className="events-button"
                                key={event.id?.concat("-button")}
                              >
                                Chat
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bottom-action">
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<ArrowRight16Filled />}
                    iconPosition="after"
                    style={{ color: "#5B5FC7" }}
                  >
                    View calendar
                  </Button>
                </div>
              </div>
            </Escape>,
          ],
        },
      ],
    },
  };
}
