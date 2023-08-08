import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { firebaseGetDocs } from "../../firebase/utils";
import { useSelector } from "react-redux";
import userSelector from "../../redux/selectors/user";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart as ChartJS,
  Chart as ChartJS1,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
ChartJS1.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
    margin: theme.spacing(2),
    boxShadow: "0px 2px 4px rgba(255, 0, 0, 0.5)", // Customize the box shadow color
  },
  cardContent: {
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Dashboard = () => {
  const inputDate = moment().format("L");
  const { currentUser } = useSelector(userSelector);
  const classes = useStyles();
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [date, setDate] = useState(inputDate);
  const [newIncomeData, setNewIncomeData] = useState([]);
  const [newExpenseData, setNewExpenseData] = useState([]);
  const [incomeDatas, setIncomeDatas] = useState([]);
  const [expenseDatas, setExpenseDatas] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [getAllValue, setGetAllValue] = useState(false);
  const startofvalue = selectedOption.slice(0, -1);
  console.log(incomeData,"incomedata111")
  console.log(newIncomeData,"newincomedata111sss")
  const getData = async (id) => {
    const incomeData1 = await firebaseGetDocs("income", id);
    const expenseData1 = await firebaseGetDocs("expense", id);
    setIncomeData(incomeData1);
    setExpenseData(expenseData1);
    setGetAllValue(true);
};
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getData(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedOption === "") {
      setSelectedOption("weeks");
    }
    dateWiseAmountPlus(incomeData, setNewIncomeData);
    dateWiseAmountPlus(expenseData, setNewExpenseData);
  }, [getAllValue])

  
  useEffect(() => {
    if (selectedOption == "weeks") {
      printWeekData(date, newIncomeData, setIncomeDatas);
      printWeekData(date, newExpenseData, setExpenseDatas);
    } else if (selectedOption == "months") {
      printMonthData(date, newIncomeData, setIncomeDatas);
      printMonthData(date, newExpenseData, setExpenseDatas);
    } else if (selectedOption == "years") {
      printTotalDataMonthWise(newIncomeData, targetYear, setIncomeDatas);
      printTotalDataMonthWise(newExpenseData, targetYear, setExpenseDatas);
    }
  }, [selectedOption,date,newIncomeData,newExpenseData]);

  //1.date wise  amount plus
  function dateWiseAmountPlus(data, stateValue) {
    const dateMap = new Map();
    for (const entry of data) {
      const { date, amount } = entry;
      const existingEntry = dateMap.get(date);
      if (existingEntry) {
        existingEntry.amount += parseInt(amount);
      } else {
        dateMap.set(date, { ...entry, amount: parseInt(amount) });
      }
    }
    const newData = Array.from(dateMap.values());
    stateValue(newData);
  }
  //2.week wise data=======================
  moment.updateLocale("custom", {
    week: { dow: 1 },
  });
  function printWeekData(inputDate, data, stateValue) {
    // Convert the input date to a Moment.js object
    const targetDate = moment(inputDate, "L");
    // Get the start and end dates of the week containing the target date
    const startOfWeek = targetDate.clone().startOf("week");
    const endOfWeek = targetDate.clone().endOf("week");
    // Initialize an object to store the data for each day of the week
    const weekData = {};
    // Iterate over the range of dates for the week
    for (
      let date = startOfWeek.clone();
      date.isSameOrBefore(endOfWeek);
      date.add(1, "day")
    ) {
      // Format the date to match the date format in the data array
      const formattedDate = date.format("L");
      // Find the data object corresponding to the current date in the data array
      const dataForDate = data.find((item) => item.date === formattedDate);
      setTimeout(() => {
        weekData[formattedDate] = dataForDate ? Number(dataForDate.amount) : 0;
        stateValue(weekData);
        console.log(weekData);
      }, 500);
    }
  }
  //month wise data=========================
  function printMonthData(inputDate, data, stateValue) {
    // Convert the input date to a Moment.js object
    const targetDate = moment(inputDate, "L");
    // Get the start and end dates of the month containing the target date
    const startOfMonth = targetDate.clone().startOf("month");
    const endOfMonth = targetDate.clone().endOf("month");
    // Initialize an object to store the data for each day of the month
    const monthData = {};
    // Iterate over the range of dates for the month
    for (
      let date = startOfMonth.clone();
      date.isSameOrBefore(endOfMonth);
      date.add(1, "day")
    ) {
      // Format the date to match the date format in the data array
      const formattedDate = date.format("L");
      // Find the data object corresponding to the current date in the data array
      const dataForDate = data.find((item) => moment(item.date).format() === moment(formattedDate).format());
      monthData[formattedDate] = dataForDate ? Number(dataForDate.amount) : 0;
    }
    stateValue(monthData);
  }
  //year wise data=======================
  const targetYear = moment(date).format("YYYY");
  function printTotalDataMonthWise(data, targetYear, stateValue) {
    // Create an object to store the total data for each month
    const totalDataMonthWise = {};

    // Initialize the total amount for each month as 0
    for (let month = 1; month <= 12; month++) {
      totalDataMonthWise[month] = 0;
    }

    // Loop through the data and calculate total amounts for each month of the target year
    data.forEach((item) => {
      const itemDate = moment(item.date, "M/D/YYYY");
      const itemYear = itemDate.year();

      if (itemYear === parseInt(targetYear, 10)) {
        const itemMonth = itemDate.month() + 1; // Moment.js months are 0-indexed
        totalDataMonthWise[itemMonth] += Number(item.amount);
      }
    });
    stateValue(totalDataMonthWise);
  }
  const propertyValues1 = Object.values(incomeDatas);
  console.log(propertyValues1, "propertyValues1");
  const propertyValues2 = Object.values(expenseDatas);
  console.log(propertyValues2);

  const totalIncome = propertyValues1.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const totalExpense = propertyValues2.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  function allZeros(data) {
    const allZeros = data.every((item) => item === 0);
    const result = allZeros ? null : data;
    return result;
  }
  const propertyNames = Object.keys(incomeDatas);
  console.log(propertyNames);
  let Chartlabel = [];
  propertyNames.forEach((element) => {
    if (selectedOption == "years") {
      Chartlabel.push(moment(element).format("MMM"));
    } else {
      Chartlabel.push(moment(element).format("MMM Do"));
    }
  });

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Income-Expense chart",
        font: { size: 25 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: `Data in ${selectedOption}`,
          font: { size: 25 },
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
        title: {
          display: true,
          text: `Data in ${selectedOption}`,
          font: { size: 25 },
        },
      },
    },
  };
  const lineChartData = {
    labels: Chartlabel,
    datasets: [
      {
        label: "Income",
        // data: [202, 10, 0, 150, 240, 30, 120],
        data: allZeros(propertyValues1),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        // fill: true,
        // tension: 0.3,
        // borderWidth: 7,
        // pointRadius: 10
      },
      {
        label: "Expense",
        data: allZeros(propertyValues2),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        // fill:true,
        // tension:0.3
      },
    ],
  };
  const pieChartData = {
    labels: ["income", "expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
        hoverOffset: 20,
      },
    ],
  };
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: "Income-Expense chart",
      },
    },
  };

  //onclick
  function handlePlusClick(date) {
    const updatedDate = moment(date, "MM/DD/YYYY")
      .add(1, `${selectedOption}`)
      .startOf(startofvalue)
      .format("L");
    setDate(updatedDate);
    console.log(updatedDate, "data");
  }
  function handleMinusClick(date) {
    const updatedDate = moment(date, "MM/DD/YYYY")
      .subtract(1, `${selectedOption}`)
      .startOf(startofvalue)
      .format("L");
    setDate(updatedDate);
    console.log(updatedDate, "data");
  }

  return (
    <>
      <Navbar />
      {(getAllValue) ? 
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <ButtonGroup>
                <Button onClick={(e) => handleMinusClick(date)}>
                  <ChevronLeftIcon />
                </Button>
                <Button>{date}</Button>
                <Button onClick={(e) => handlePlusClick(date)}>
                  <ChevronRightIcon />
                </Button>
              </ButtonGroup>
            </div>
            <div style={{ marginLeft: "90px" }}>
              <ButtonGroup size="large" aria-label="large button group">
                <Button
                  onClick={(e) => setSelectedOption("weeks")}
                  key={"weeks"}
                >
                  Week
                </Button>
                <Button
                  onClick={(e) => setSelectedOption("months")}
                  key={"months"}
                >
                  Month
                </Button>
                <Button
                  onClick={(e) => setSelectedOption("years")}
                  key={"years"}
                >
                  Year
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="" style={{ paddingTop: "30px" }}>
            <Grid container justifyContent="center" spacing={6}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "20px",
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Income
                      </Typography>
                      <Typography variant="h6" style={{ fontWeight: "normal" }}>
                        {totalIncome}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "20px",
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Expense
                      </Typography>
                      <Typography variant="h6" style={{ fontWeight: "normal" }}>
                        {totalExpense}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "20px",
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Profit/Loss
                      </Typography>
                      <Typography variant="h6" style={{ fontWeight: "normal" }}>
                        {totalIncome - totalExpense}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div></div>

          <Grid container spacing={2}>
            <Grid item xs={1} md={1}></Grid>
            <Grid item xs={5} md={5}>
              <Line options={lineChartOptions} data={lineChartData} />;
            </Grid>
            <Grid item xs={1} md={1}></Grid>
            <Grid item xs={4} md={4}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </Grid>
          </Grid>
        </>
       : 
      <div>loading...</div>
      }
    </>
  );
};

export default Dashboard;
