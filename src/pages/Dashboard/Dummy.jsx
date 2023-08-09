import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const data1 = ["demo", "demo1", "demo2", "demo2", "demo5", "demo1", "demo3"];

function removeDuplicates(arr) {
    const uniqueArray = [];
    for (let item of arr) {
        if (!uniqueArray.includes(item)) {
            uniqueArray.push(item);
        }
    }
    return uniqueArray;
}

const uniqueData = removeDuplicates(data1);
console.log(uniqueData);
/////////////////////////
export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

// uniqueData.map((key,index)=>{
//   console.log(index.data1)
//      return(
//       <div key={key}>
//             {index.data1}
//       </div>
//      )

// })
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labelData=['demo', 'demo1', 'demo2', 'demo5', 'demo3']
export const data = {
  labels,
  datasets: labelData.map((label, index) => ({
    label: label,
    data: [1, 3, 4, 5, 6, 11, 8], // Example data for each dataset
    backgroundColor: `rgb(${index * 30+20}, ${index * 50-10}, ${index * 20*3})`,
  })),
};

const Dummy = () => {
  return (
   <>
   
   <Bar options={options} data={data} />
   
   </>
  )
}

export default Dummy

