import Link from 'next/link';


const LandingPage = ({ currentUser ,tickets}) => {
  const ticketList=
    tickets.map((ticket,index)=>{

     return (<tr key={ticket.id} >
      <td>{index+1}</td>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href="/tickets/[ticketId]" as ={`/tickets/${ticket.id}`}>
          <a>View</a>
        </Link>
        </td>
      </tr>
      );
    });

  

  return  (
    <table class="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Links</th>
     
    </tr>
  </thead>
  <tbody>
    {ticketList}
  </tbody>
</table>
  )
};

LandingPage.getInitialProps = async (context, client,currentUser) => {
  const {data} = await client.get("/api/tickets");

  
  return {tickets:data};
};

export default LandingPage;
