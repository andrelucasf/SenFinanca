import "./styles.css"
import { useEffect, useState } from "react";
import incomeIcon from "../../assets/income.png"
import expenseIcon from "../../assets/expense.png"
import logo from "../../assets/logo.png"
import { formattedCurrency } from "../services/formattedCurrency";

const Dashboard = ({transactions}) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const valueIncome = transactions
      .filter((item) => item.type === "Entrada")
      .map((transaction) => Number(transaction.value));

      const income = valueIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
      
      console.log(income);
      
      const valueExpense = transactions
      .filter((item) =>  item.type === "Saida")
      .map((transaction) => Number(transaction.value));

      const expense = valueExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    console.log(expense);

    const total = (income - expense).toFixed(2);

    console.log(total);

    setIncome(Number(income));
    setExpense(Number(expense));
    setTotal(Number(total));
  }, [transactions]);

  return (
    <div className='dashboard-content'>
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <p className="dashboard-title">Entradas</p>
          <img className="dashboard-card-logo" src={incomeIcon} alt="income"/>
        </div>
        <p className="dashboard-card-income">{formattedCurrency(income)}</p>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <p className="dashboard-title">Saidas</p>
          <img className="dashboard-card-logo" src={expenseIcon} alt="income"/>
        </div>
        <p className="dashboard-card-expense">{formattedCurrency(expense)}</p>
      </div>
      <div className={total >= 0 ? "dashboard-card total" : "dashboard-card total-negative"}>
        <div className="dashboard-card-title">
          <p className="dashboard-title-total">Total</p>
          <img className="dashboard-card-logo" src={logo} alt="income"/>
        </div>
        <p className="dashboard-card-total">{formattedCurrency(total)}</p>
      </div>
    </div>
  );
};

export default Dashboard;