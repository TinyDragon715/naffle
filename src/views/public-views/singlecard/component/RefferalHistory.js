import '../css/RefferalHistory.css';

const truncate = (str) => {
  return str.substr(0,6)+"..."+str.substr(str.length-4,str.length-1);
}
const RefferalHistory = () => {
    return(
        <>
        <div className="CoverTable NFTHistory">
            <div className="TableCaption">NFT History</div>
            <table>
                <thead>

                <tr>
                    <th>Event</th>
                    <th>Price</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Sale</td>
                    <td>0.249</td>
                    <td>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</td>
                    <td>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</td>
                    <td>4 months ago</td>
                </tr>
                <tr>
                <td>transfer</td>
                    <td>0.249</td>
                    <td>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</td>
                    <td>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</td>
                    <td>4 months ago</td>
                </tr>
                <tr>
                <td>Minted</td>
                    <td>0.249</td>
                    <td>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</td>
                    <td>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</td>
                    <td>4 months ago</td>
                </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default RefferalHistory;