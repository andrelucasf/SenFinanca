import { useForm } from "react-hook-form";
import "./styles.css"
import bin from "../../assets/bin.svg"
import edit from "../../assets/edit.svg"
import filter from "../../assets/filter.svg"
import { useState, useEffect } from "react";
import { formattedCurrency } from "../services/formattedCurrency";

const TransactionTable = ( {addTransaction, transactions, deleteTransaction, editTransaction}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [idTransactionEdit, setIdTransactionEdit] = useState("")
  const [transactionEdit, setTransactionEdit] = useState({})
  const [transactionsFilter, setTransactionsFilter] = useState(0)
  const [transactionsTemp, setTransactionsTemp] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const Transaction = {
      title: data.title,
      type: data.type,
      category: data.category,
      value: Number(data.value)
    }
    console.log(Transaction);
    if (showEdit)
      editTransaction(Transaction, idTransactionEdit)
    else
      addTransaction(Transaction)
  }

  const filterType = () => {
    setTransactionsFilter(1)
    let x = document.getElementById("filterType").value;
    const res = transactions.filter((item) => item.type === x)
    .map((transaction) => (transaction));
    setTransactionsTemp(res)
  }

  const filterCategory = () => {
    setTransactionsFilter(2)
    let x = document.getElementById("filterCategory").value;
    console.log(x);
    const res = transactions.filter((item) => item.category === x)
    .map((transaction) => (transaction));
    setTransactionsTemp(res)
  }

  return (
    <div className='transaction-content'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="transaction-form" >
            <input className="transaction-input" placeholder='Título' defaultValue={transactionEdit.title} type="text" {...register("title")}/>
            <select className="transaction-input" placeholder='Tipo' defaultValue={transactionEdit.type} type="text" {...register("type")}>
              <option value="Entrada">Entrada</option>
              <option value="Saida">Saída</option>
            </select>
            <input className="transaction-input" defaultValue={transactionEdit.category} placeholder='Categoria' type="text" {...register("category")}/>
            <input className="transaction-input margin-0" defaultValue={transactionEdit.value} placeholder='Valor' type="text" {...register("value")}/>
          </div>
          {showEdit ?
            <button className="transaction-button" type="submit">Editar transação</button>
          :
            <button className="transaction-button" type="submit">Adicionar nova transação</button>
          }
        </form>
      </div>
      <div className="inline-flex margin-bottom-20">
        <label className="transaction-input-label-1" for="type">Filtre por tipo:</label>
        <select id="filterType" className="transaction-input" type="text" onChange={() => filterType()}>
          <option value=""></option>
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saída</option>
        </select>
        <label className="transaction-input-label-2" for="category">Filtre por categoria:</label>
        <select id="filterCategory" className="transaction-input" type="text" onChange={() => filterCategory()}>
         <option value=""></option>
          {transactions?.map((transaction, index) => (
          <option key={index} value={transaction.category}>{transaction.category}</option>
            ))
          }
        </select>
        <div>
          <button className="transaction-button-clear" type="submit" onClick={() => setTransactionsFilter(0)}>Limpar</button>
        </div>
      </div>
      <div className="transaction-table-overflow">
      <table className="transaction-table">
        <thead>
          <tr>
            <th className="transaction-table-th">Título</th>
            <th className="transaction-table-th">Tipo</th>
            <th className="transaction-table-th">Categoria</th>
            <th className="transaction-table-th">Preço</th>
          </tr>
        </thead>
        <tbody>
        {transactionsFilter === 0 &&
          transactions?.map((transaction, index) => (
          <tr key={transaction.id}>
          <td className="transaction-table-td">{transaction.title}</td>
          <td className="transaction-table-td">{transaction.type}</td>
          <td className="transaction-table-td">{transaction.category}</td>
          <td className="transaction-table-td">{formattedCurrency(transaction.value)}</td>
          <td className="transaction-table-td table-align-right"> 
          <div className="inline-flex">
            <span onClick={() => {setTransactionEdit(transaction); setIdTransactionEdit(transaction.id); setShowEdit(true);}}>
              <img className="transaction-table-icons" src={edit} alt="edit"/>
            </span>
            <span onClick={() => deleteTransaction(transaction.id)}>
              <img className="transaction-table-icons" src={bin} alt="bin"/>
            </span>
          </div>
          </td>
          </tr>
          ))
        }
        {transactionsFilter === 1 &&
          transactionsTemp?.map((transaction, index) => (
          <tr key={transaction.id}>
          <td className="transaction-table-td">{transaction.title}</td>
          <td className="transaction-table-td">{transaction.type}</td>
          <td className="transaction-table-td">{transaction.category}</td>
          <td className="transaction-table-td">{formattedCurrency(transaction.value)}</td>
          <td className="transaction-table-td table-align-right"> 
          <div className="inline-flex">
            <span onClick={() => {setTransactionEdit(transaction); setIdTransactionEdit(transaction.id); setShowEdit(true);}}>
              <img className="transaction-table-icons" src={edit} alt="edit"/>
            </span>
            <span onClick={() => deleteTransaction(transaction.id)}>
              <img className="transaction-table-icons" src={bin} alt="bin"/>
            </span>
          </div>
          </td>
          </tr>
          ))
        }
        {transactionsFilter === 2 &&
          transactionsTemp?.map((transaction, index) => (
          <tr key={transaction.id}>
          <td className="transaction-table-td">{transaction.title}</td>
          <td className="transaction-table-td">{transaction.type}</td>
          <td className="transaction-table-td">{transaction.category}</td>
          <td className="transaction-table-td">{formattedCurrency(transaction.value)}</td>
          <td className="transaction-table-td table-align-right"> 
          <div className="inline-flex">
            <span onClick={() => {setTransactionEdit(transaction); setIdTransactionEdit(transaction.id); setShowEdit(true);}}>
              <img className="transaction-table-icons" src={edit} alt="edit"/>
            </span>
            <span onClick={() => deleteTransaction(transaction.id)}>
              <img className="transaction-table-icons" src={bin} alt="bin"/>
            </span>
          </div>
          </td>
          </tr>
          ))
        }
        </tbody>
        </table>
        </div>
        <div>
        </div>
    </div>
  );
};

export default TransactionTable;