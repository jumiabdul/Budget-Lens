import { useSelector } from "react-redux";

export default function ProgressBars({ budgets = [], selectedMonth }) {
    const transactions = useSelector((state) => state.transactions);

    //filter budgets for selected month
    const monthBudgets = budgets.filter((b) => b.month === selectedMonth);

    //convert array to object
    const budgetObj = monthBudgets.reduce((acc, b) => {
        acc[b.category] = b.amount;
        return acc;
    }, {});

    //filter transactions for that month
    const monthTransactions = transactions.filter((t) => {
        const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
        return onlyMonth === selectedMonth && t.type === "expense"
    }
    );

    //calculate expenses by category
    const categoryTotals = monthTransactions.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    //remaining budget per category
    const remainingByCategory = Object.keys(budgetObj).reduce((obj, cat) => {
        const planned = budgetObj[cat] || 0;
        const spent = categoryTotals[cat] || 0;
        obj[cat] = planned - spent;
        return obj;
    }, {});

    return (
        <div>
            {
                Object.keys(budgetObj).map((cat) => {
                    const budget = budgetObj[cat];
                    const expense = categoryTotals[cat] || 0;
                    const percentSpent = budget > 0 ? (expense / budget) * 100 : 0;
                    return (
                        <div key={cat}>
                            <div className="flex justify-between text-sm mb-1 mt-3">
                                <span className=" text-gray-600 font-medium">{cat}</span>
                                <span className=" text-gray-600 font-medium" >₹{expense}/₹{budget}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-green-500"
                                    style={{ width: `${Math.min(percentSpent, 100)}%` }}>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}



