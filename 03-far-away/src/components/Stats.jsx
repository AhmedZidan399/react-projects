export function Stats({ itemsCount, itemsPacked }) {
    const percentage = Math.round((itemsPacked / itemsCount) * 100);
    return <div className="stats">
        <i>
            { itemsCount ?
                percentage !== 100 ?
                    `You have ${ itemsCount } item on your list,
            and you already packed ${ itemsPacked + " " }
            (${ percentage || 0 }%)` : "You got everything!, Ready to go ✈️" : "Start adding some items to your packing list 🚀" }
        </i>
    </div>;
}