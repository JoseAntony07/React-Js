
// multi component in single page

function App1() {
    return <h1>App 1</h1>
  }
  

function App2() {
    return (
        // when we want to multiple html tags in a single component
        <> 
            <h2>Name  - Jose Antony</h2>
            <h2>Age  - 28</h2>
        </>
    
    )
  }


  export {App1, App2}
  