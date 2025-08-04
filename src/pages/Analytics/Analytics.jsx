import { ButtonRed, CardBox, CardImg, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { fetchData } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Analytics = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5", "#000", "#a2081f"],
    series: [0, 0, 0, 0, 0, 0],
    labels: ["One", "Two", "Three", "Four", "Five", "API"],
  });
  const [chartDataApi, setChartDataApi] = useState({
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5", "#000", "#a2081f"],
    series: [0, 0, 0, 0, 0, 0],
    labels: ["One", "Two", "Three", "Four", "Five", "API"],
  });
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [formattedDates, setFormattedDates] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "radialBar",
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        track: {
          show: true,
          background: "#f0f0f0",
          strokeWidth: "100%",
          opacity: 1,
          margin: 5,
          dropShadow: {
            enabled: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: "16px",
          formatter: function (seriesName, opts) {
            const value = parseFloat(
              opts.w.globals.series[opts.seriesIndex]
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return seriesName + ":  " + value;
          },
        },
      },
    },
    colors: chartData.colors,
    labels: chartData.labels,
  });

  const [chartOptionsApi, setChartOptionsApi] = useState({
    chart: {
      type: "radialBar",
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        track: {
          show: true,
          background: "#f0f0f0",
          strokeWidth: "100%",
          opacity: 1,
          margin: 5,
          dropShadow: {
            enabled: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: "16px",
          formatter: function (seriesName, opts) {
            const value = parseFloat(
              opts.w.globals.series[opts.seriesIndex]
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return seriesName + ":  " + value;
          },
        },
      },
    },
    colors: chartDataApi.colors,
    labels: chartDataApi.labels,
  });

  useEffect(() => {
    if (selected && formattedDates) {
      console.log("Fetching data...");
      fetchChartData();
      fetchChartDataApi();
    }
  }, [selected, formattedDates]);

  const fetchChartData = async () => {
    setIsLoading(true);
    await fetchData(
      `admin/get-chart-data`,
      {
        start_date: formattedDates.startDate,
        end_date: formattedDates.endDate,
        currency: selected,
      },
      "POST"
    )
      .then((res) => {
        console.log("Fetched data: ", res);
        setChartData({
          ...res,
          series: res.series.length ? res.series : [0, 0, 0, 0, 0, 0],
        });
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          colors: res.colors,
          labels: res.labels,
        }));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const fetchChartDataApi = async () => {
    setIsLoading(true);
    await fetchData(
      `admin/get-chart-data-api`,
      {
        start_date: formattedDates.startDate,
        end_date: formattedDates.endDate,
        currency: selected,
      },
      "POST"
    )
      .then((res) => {
        setChartDataApi({
          ...res,
          series: res.series.length ? res.series : [0, 0, 0, 0, 0, 0],
        });
        setChartOptionsApi((prevOptions) => ({
          ...prevOptions,
          colors: res.colors,
          labels: res.labels,
        }));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectionRange(ranges.selection);
    setFormattedDates({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  return (
    <div className="">
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Analytics" />
        </Col>
      </Row>
      <Row className="">
        <Col md={4}>
          <div>
            <button
              className="w-full py-2 text-center border-2 outline-none border-Pink rounded-xl"
              onClick={() => setShowPicker(!showPicker)}
            >
              Select Date
            </button>
            {showPicker && (
              <div style={{ position: "absolute", zIndex: 1000 }}>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
              </div>
            )}
          </div>
        </Col>
        <Col md={4}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full py-2 text-center border-2 outline-none border-Pink rounded-xl"
          >
            <option value="USD">USD</option>
            <option value="LBP">LBP</option>
          </select>
        </Col>
      </Row>
      <div className="mt-14">
        {isLoading ? (
          <Loading />
        ) : (
          <Row>
            <Col md={6}>
              <Chart
                options={chartOptions}
                series={chartData.series}
                type="radialBar"
                width="500"
              />
              <div className="text-Pink mt-4 px-48">
                Total: {chartData.series.reduce((a, b) => a + b, 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
               {selected}
              </div>
            </Col>
            <Col md={6}>
              <Chart
                options={chartOptionsApi}
                series={chartDataApi.series}
                type="radialBar"
                width="500"
              />
              <div className="text-Pink mt-4 px-48">
                Total:{" "}
                {chartDataApi.series.reduce((a, b) => a + b, 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} {selected}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Analytics;
