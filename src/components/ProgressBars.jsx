import { useSelector } from "react-redux";

export default function ProgressBars({ budgets = [], selectedMonth, selectedYear, viewMode }) {
    const transactions = useSelector((state) => state.transactions);

    //filter budgets based on viewmode
    let filteredBudgets = [];
    if (viewMode == "monthly") {
        filteredBudgets = budgets.filter((b) =>
            (!selectedMonth || b.month === selectedMonth) &&
            (!selectedYear || b.year === selectedYear));

    } else if (viewMode == "yearly") {
        filteredBudgets = budgets.filter((b) =>
            !selectedYear || b.year === selectedYear);
    }

    //convert budget array to object
    const budgetObj = filteredBudgets.reduce((acc, b) => {
        acc[b.category] = b.amount;
        return acc;
    }, {});

    //filter transactions based on viewmode
    let filteredTransactions = [];
    if (viewMode === "monthly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
            const onlyYear = new Date(t.date).getFullYear().toString();
            return (
                (!selectedMonth || onlyMonth === selectedMonth) &&
                (!selectedYear || onlyYear === selectedYear) && t.type === "expense"
            )
        }
        )
    } else if (viewMode === "yearly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyYear = new Date(t.date).getFullYear().toString();
            return (!selectedYear || onlyYear === selectedYear) && t.type === "expense"
        })
    }

    //calculate expenses by category
    const categoryTotals = filteredTransactions.reduce((obj, t) => {
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
            {Object.keys(budgetObj).length === 0 && (
                <p className="text-gray-500">No budget data
                    {viewMode === "monthly" ? selectedMonth : selectedYear}</p>
            )}
            {Object.keys(budgetObj).map((cat) => {
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
                            <div className={`h-2 rounded-full ${percentSpent >= 100 ? "bg-red-700" : "bg-green-700"} `}
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



