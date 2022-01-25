import '../css/NFTTransaction.css';

const NFTTransaction = () => {
    return(
        <>
        <div className="CoverTable">
            <div className="TableCaption">Transaction History</div>
            <table>
                <thead>

                <tr>
                    <th>Name</th>
                    <th>Tickets Bought</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>User12591</td>
                    <td>3</td>
                    <td>6 months ago</td>
                </tr>
                <tr>
                    <td>User12591</td>
                    <td>3</td>
                    <td>6 months ago</td>
                </tr>
                <tr>
                    <td>User12591</td>
                    <td>3</td>
                    <td>6 months ago</td>
                </tr>
                <tr>
                    <td>User12591</td>
                    <td>3</td>
                    <td>6 months ago</td>
                </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default NFTTransaction;