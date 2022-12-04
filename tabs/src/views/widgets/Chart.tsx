import * as d3 from "d3-format";

import { AreaChart, IChartProps } from "@fluentui/react-charting";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  Text,
  ToggleButton,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowRight16Filled,
  DataPieRegular,
  MoreHorizontal32Regular,
  RocketRegular,
} from "@fluentui/react-icons";

import {
  chart1Points_30D,
  chart1Points_60D,
  chart1Points_7D,
  chart2Points_30D,
  chart2Points_60D,
  chart2Points_7D,
} from "../../services/sampleRequest";
import { Widget } from "../lib/Widget";
import { headerContentStyle, headerTextStyle } from "../lib/Widget.styles";
import { tableColumnStyle, timeSpanStyle } from "../styles/ChartWidget.style";
import { tableData } from "../../services/chartService";
import { TableModel } from "../../models/tableModel";

enum DayRange {
  Seven,
  Thirty,
  Sixty,
}

interface IChartWidgetState {
  dayRange: DayRange;
  chartProps: IChartProps;
}

export class Chart extends Widget<IChartWidgetState> {
  async getData(): Promise<IChartWidgetState> {
    const chartPoints = [
      {
        legend: "Line 1",
        data: chart1Points_7D,
        color: "#6264A7",
      },
      {
        legend: "Line 2",
        data: chart2Points_7D,
        color: "#D9DBDB",
      },
    ];
    const chartData = {
      chartTitle: "Area chart multiple example",
      lineChartData: chartPoints,
    };
    return {
      dayRange: DayRange.Seven,
      chartProps: chartData,
    };
  }

  headerContent(): JSX.Element | undefined {
    return (
      <div style={headerContentStyle()}>
        <DataPieRegular style={{ height: "1.5rem", width: "1.5rem" }} />
        <Text style={headerTextStyle()}>Area chart</Text>
        <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
      </div>
    );
  }

  bodyContent(): JSX.Element | undefined {
    return (
      <>
        <div>
          <ToggleButton
            appearance="transparent"
            checked={this.state.data?.dayRange === DayRange.Seven}
            style={timeSpanStyle()}
            onClick={() =>
              this.setState({
                data: {
                  chartProps: this.retriveChartsData(DayRange.Seven),
                  dayRange: DayRange.Seven,
                },
              })
            }
          >
            7 Days
          </ToggleButton>
          <ToggleButton
            appearance="transparent"
            checked={this.state.data?.dayRange === DayRange.Thirty}
            style={timeSpanStyle()}
            onClick={() =>
              this.setState({
                data: {
                  chartProps: this.retriveChartsData(DayRange.Thirty),
                  dayRange: DayRange.Thirty,
                },
              })
            }
          >
            30 Days
          </ToggleButton>
          <ToggleButton
            appearance="transparent"
            checked={this.state.data?.dayRange === DayRange.Sixty}
            style={timeSpanStyle()}
            onClick={() =>
              this.setState({
                data: {
                  chartProps: this.retriveChartsData(DayRange.Sixty),
                  dayRange: DayRange.Sixty,
                },
              })
            }
          >
            60 Days
          </ToggleButton>
        </div>

        <div style={{ position: "relative", height: "200px", width: "100%" }}>
          {this.state.data?.chartProps && (
            <AreaChart
              data={this.state.data.chartProps}
              legendsOverflowText={"Overflow Items"}
              yAxisTickFormat={d3.format(".1s")}
              wrapXAxisLables={false}
              legendProps={{
                allowFocusOnLegends: true,
              }}
            />
          )}
        </div>

        <div style={{ display: "grid", gap: "0.69rem" }}>
          <Text>Features backlog(57)</Text>
          <div style={tableColumnStyle()}>
            <Text>Title</Text>
            <Text>Assigned To</Text>
            <Text>PM Owner</Text>
            <Text>Priority</Text>
            <Text>State</Text>
          </div>
          {tableData.map((item: TableModel, index) => (
            <div style={tableColumnStyle()}>
              <Text>{item.title}</Text>
              <div>
                <Avatar
                  name="John Doe"
                  image={{ src: `${item.avatar}` }}
                  size={16}
                />
                <Text>{item.name}</Text>
              </div>
              <div>
                <Avatar
                  name="John Doe"
                  image={{ src: `${item.avatar}` }}
                  size={16}
                />
                <Text>{item.name}</Text>
              </div>
              <Text>{item.priority}</Text>
              <Text>{item.state}</Text>
            </div>
          ))}
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
        View query
      </Button>
    );
  }

  private retriveChartsData(r: DayRange): IChartProps {
    const chartPoints = [
      {
        legend: "Line 1",
        data:
          r === DayRange.Seven
            ? chart1Points_7D
            : r === DayRange.Thirty
            ? chart1Points_30D
            : chart1Points_60D,
        color: "#6264A7",
      },
      {
        legend: "Line 2",
        data:
          r === DayRange.Seven
            ? chart2Points_7D
            : r === DayRange.Thirty
            ? chart2Points_30D
            : chart2Points_60D,
        color: "#D9DBDB",
      },
    ];
    const chartData = {
      chartTitle: "Area chart multiple example",
      lineChartData: chartPoints,
    };
    return chartData;
  }
}