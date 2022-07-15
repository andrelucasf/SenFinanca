import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import "./App.css"
import Dashboard from './components/Dashboard';
import TransactionTable from './components/TransactionsTable';

function App() {
    const [transactions, setTransactions] = useState([]); 
    const getTransactions = JSON.parse(localStorage.getItem("transactionsAdd"));

    useEffect(() => {
        if (getTransactions == null) {
            setTransactions([])
        } else {
            setTransactions(getTransactions);
        }
    }, [])

    const addTransaction = (transaction) => {
        const id = uuidv4();
        const newTransaction = { id, ...transaction }
        setTransactions([...transactions, newTransaction]);
        localStorage.setItem("transactionsAdd", JSON.stringify([...transactions, newTransaction]));
    }

    const deleteTransaction = (id) => {
        const deleteTransaction = transactions.filter((transaction) => transaction.id !== id);
        setTransactions(deleteTransaction);
        localStorage.setItem("transactionsAdd", JSON.stringify(deleteTransaction));
    }

    const editTransaction = ( transaction, id) => {
        const title = transaction.title;
        const type = transaction.type;
        const category = transaction.category;
        const value = transaction.value;
        let data = JSON.parse(localStorage.getItem('transactionsAdd'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    title: title,
                    type: type,
                    category: category,
                    value: value,
                    id: uuidv4()
                }
            }
            return x;
        })
        console.log(myData);
        localStorage.setItem("transactionsAdd", JSON.stringify(myData));
        window.location.reload();
    }

    return (  
        <div className='content-app'> 
          <Header/>
          <Dashboard transactions= {transactions} />
          <TransactionTable 
            addTransaction={addTransaction} 
            transactions= {transactions} 
            deleteTransaction={deleteTransaction} 
            editTransaction={editTransaction}
          />
        </div>
    )
}
export default App;