const CACHE="CACHE"
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14

/**
 * Function to get the current time in milliseconds.
 * @returns {number} - The current time.
 */
const currentTime=()=>{
    return Date.now()
}


/**
 * Function to retrieve the cache from local storage.
 * @returns {object} - The cache object containing data and next cleanup time.
 */
const getCache=()=>{

    let pCache={
        data:{},
        nextCleanup:new Date().getTime()+TWO_WEEKS
    }  

    try {
        const data=localStorage.getItem(CACHE)

        if(data){
            pCache=JSON.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return pCache
}


/**
 * Function to set data to the cache in local storage.
 * @param {string} userId - The user ID.
 * @param {any} value - The value to be stored in the cache.
 */
const setToCache=(userId,value)=>{

    const pCache=getCache()
    const data=pCache.data


    const item={
        id:userId,
        expiry:new Date().getTime()+TWO_WEEKS,
        value:value
    }

    data[userId]=item

    try{
        localStorage.setItem(CACHE,JSON.stringify(pCache))
    }
    catch(e){
        cleanUpStorage(data)
    }

}

/**
 * Function to clean up expired and excess cache items from local storage.
 * @param {object} data - The cache data object.
 */
const cleanUpStorage=(data)=>{

    let isDeleted
    let oldest
    let oldestKey


    //if 14 days have been passed, it removes the cache
    for (const key in data) {
        const expiry = data[key].expiry
        if (expiry && expiry <=currentTime()) {
          delete data[key]
          isDeleted = true
        }
    
        //finding the oldest cache in case none of them are expired
        if (!oldest || oldest > expiry) {
          oldest = expiry
          oldestKey=key
        }
    }

    //remove the oldest cache if there is no more space in local storage (5 MB)
    if(!isDeleted && oldestKey){
        delete data[oldestKey]
    }

    localStorage.setItem(
        CACHE,
        JSON.stringify({
          data: data,
          nextCleanup:currentTime() + TWO_WEEKS,
        })
    )

}

export {setToCache,getCache}