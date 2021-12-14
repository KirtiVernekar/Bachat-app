import queryString from 'query-string'

const create = async (credentials, transaction) => {
    try {
      let response = await fetch('/api/transactions/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(transaction)
      })
        return await response.json()
      } catch(err) { 
        console.log(err)
      }
  }
    
  const listByUser = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
      let response = await fetch('/api/transactions?'+query, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }

  const currentMonthPreview = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
      let response = await fetch('/api/transactions/current/preview?'+query, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }

  const transactionByCategory = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
      let response = await fetch('/api/transactions/by/category?'+query, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }
  
  const averageCategories = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
      let response = await fetch('/api/transactions/category/averages?'+query, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }

  const yearlyTransactions = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
      let response = await fetch('/api/transactions/yearly?'+query, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }

  const plotTransactions = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
      let response = await fetch('/api/transactions/plot?'+query, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    }catch(err){
      console.log(err)
    }
  }

  const read = async (params, signal) => {
    try {
      let response = await fetch('/api/auction/' + params.auctionId, {
        method: 'GET',
        signal: signal,
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
  }
  
  const update = async (params, credentials, transaction) => {
    try {
      let response = await fetch('/api/transactions/' + params.transactionId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
        body: JSON.stringify(transaction)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/transactions/' + params.transactionId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    create,
    listByUser,
    currentMonthPreview,
    transactionByCategory,
    averageCategories,
    yearlyTransactions,
    plotTransactions,
    read,
    update,
    remove
  }