import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";

function App() {
    const [loading, setloading] = useState(true); 
    const [transactions, setTransactions] = useState([]); 
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3500);
    }, [])
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

    const editTransaction = (id) => {
        const title = ("Melão");
        const type = ("Fruta");
        const category = ("Compras");
        const value = (10);
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

    const onSubmit = (data) => {
      const Transaction = {
        title: data.title,
        type: data.type,
        category: data.category,
        value: data.value
      }
      console.log(Transaction);
      addTransaction(Transaction)
    }

    return (  
      <>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='titulo' type="text" {...register("title")}/>
            <input placeholder='tipo' type="text" {...register("type")}/>
            <input placeholder='categoria' type="text" {...register("category")}/>
            <input placeholder='valor' type="text" {...register("value")}/>
            <button onClick={handleSubmit}>Enviar</button>
          </form>
        </div>
        <div>
        {
        transactions?.map((transaction, index) => (
          <>
            <h1 key={index}>{transaction.id}</h1>
            <h1>{transaction.title}</h1>
            <h1>{transaction.type}</h1>
            <h1>{transaction.category}</h1>
            <h1>{transaction.value}</h1>
            <button onClick={() => deleteTransaction(transaction.id)}>Excluir</button>
            <button onClick={() => editTransaction(transaction.id)}>Editar</button>
          </>
        ))
      }
        </div>
      </>
    )
}
export default App;