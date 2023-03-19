
import api from '@/api';
import BallotClientPage from './client';

export default async function Home() {
  const ballots = await api.ballot.list();

  return (
    <main>
   <h1>Movies Awards 2021</h1>
     <BallotClientPage ballots={ballots}/>
    </main> 
    );
  
}
