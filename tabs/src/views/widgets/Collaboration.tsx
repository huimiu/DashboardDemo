import { Button, Image, Text, tokens } from "@fluentui/react-components";
import {
  ArrowRight16Filled,
  CircleSmall20Filled,
  MoreHorizontal32Regular,
  Share20Regular,
} from "@fluentui/react-icons";

import { CollaborationModel } from "../../models/collaborationModel";
import { getCollaborationData } from "../../services/collaborationService";
import { Widget } from "../lib/Widget";
import { headerStyleWithoutIcon, headerTextStyle } from "../lib/Widget.styles";
import {
  contentLayout,
  descriptionStyle,
  titleStyle,
} from "../styles/Collaboration.styles";

export class Collaboration extends Widget<CollaborationModel[]> {
  async getData(): Promise<CollaborationModel[]> {
    return getCollaborationData();
  }

  headerContent(): JSX.Element | undefined {
    return (
      <div style={headerStyleWithoutIcon()}>
        <Text style={headerTextStyle()}>Team collaborations</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  bodyContent(): JSX.Element | undefined {
    return (
      <>
        <div style={contentLayout()}>
          {this.state.data?.map((item: CollaborationModel) => {
            return (
              <div style={{ display: "grid" }}>
                <Image src={item.img} width="100%" shape="rounded" />
                <Text style={titleStyle()}>{item.title}</Text>
                <Text style={descriptionStyle()}>{item.description}</Text>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "8fr min-content max-content 2fr",
                  }}
                >
                  <Share20Regular />
                  <CircleSmall20Filled
                    style={{ color: tokens.colorNeutralForeground3 }}
                  />
                  <Text style={{ color: tokens.colorNeutralForeground3 }}>
                    {item.updateTime}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  footerContent(): JSX.Element | undefined {
    return (
      <Button
        appearance="transparent"
        icon={<ArrowRight16Filled />}
        iconPosition="after"
        size="small"
        style={{ width: "fit-content", color: tokens.colorBrandForeground1 }}
        onClick={() => {}} // navigate to detailed page
      >
        View all
      </Button>
    );
  }
}
