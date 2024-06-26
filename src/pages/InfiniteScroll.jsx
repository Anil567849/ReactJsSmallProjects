import React, {useEffect, useState, useRef} from 'react';


const Style = {
    container: {
        border: '2px solid black',
        maxHeight: '40vh',
        width: '40vw',
        overflowY: 'auto',
    }
}

function InfiniteScroll() {

    const [ft, setft] = useState([])
    const containerRef = useRef(null);
    const [index, setIndex] = useState(1);

    async function fetchData(url) {
        const result = await fetch(url);
        const res = await result.json();
        console.log(res);
        setft((p) => {
            return [...p, res];
        });
    }

    useEffect(() => {
        let ind = index;
        for(let i = 0; i < 5; i++){

          fetchData(`https://jsonplaceholder.typicode.com/todos/${ind}`);
          ind++;
      }
      setIndex(index+5);
    }, [])

    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          console.log('Scrolled to the end');
          let ind = index;
          for(let i = 0; i < 5; i++){

            fetchData(`https://jsonplaceholder.typicode.com/todos/${ind}`);
            ind++;
        }
        setIndex(index+5);
        }
      };

  return (
    <div>
        <h1>InfiniteScroll</h1>
        <div    
            onScroll={handleScroll} 
            ref={containerRef}
            style={Style.container}>
            {
                ft.map((item) => {
                    return <h1 key={item.id}>{item.id}</h1>
                })
            }
        </div>
    </div>
  )
}

export default InfiniteScroll