'use client';

import type {Ballot, Nominee} from '@/types';
import * as React from 'react';

type Props = {
ballots: Ballot[];
};


export default function BallotClientPage ({ballots}:Props){

const [votes,setVotes] = React.useState(()=> new Map <Ballot['title'], Nominee>());
const isNotComplete = votes.size === ballots.length;

function handleVote(ballotTitle: Ballot['title'], nominee: Nominee){
    const draft = structuredClone(votes);

    draft.set(ballotTitle,nominee);

    setVotes(draft);
}


function handleSubmit(){
alert(
    Array.from(votes.entries())
    .map(([ballotsTitle, nominee])=>`${ballotsTitle}: ${nominee.title}`)
    .join('\n')
);
}


return (
    <article 
    style={{   
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        gap:24,
    }}>
     {ballots.map((ballot)=>(
      <section 
      key={ballot.id}
      style={{
        alignSelf:'stretch',
        color:'white'
      }}
      >
        <h2>{ballot.title}</h2>
        <ul style={{display:'grid', 
        gridTemplateColumns:'repeat(auto-fill, minmax(256px, 1fr))',
        gap:12,
              }}>
          {
            ballot.items.map((nominee) => (
              <div
              key={nominee.id}
              style={{
              display:'flex',
              flexDirection:'column',
              border:votes.get(ballot.title)?.id === nominee.id ? '3px solid gold' : 'none',
              backgroundColor:'aliceblue',
              padding:12,
              color:'black',
              alignItems:'center'
              
            }}
              >
              <span
              style={{
                margin:12,
                fontSize:25,
              }}
              >{nominee.title}</span>
              
                <img 
                style={{
                    border:'5px solid black',
                    borderRadius:128,
                    width:128,
                    height:128,
                    padding:2
                }}
                src={nominee.photoUrL}></img>
                
              
              <button onClick={()=> handleVote(ballot.title, nominee)}>Vote</button>
              </div>
              
          ))}
        </ul>
        
         </section>
    ))}
   <button disabled={!isNotComplete} onClick={()=>handleSubmit()}>Send Result </button>
</article>)
}