module.exports = (arrayData) =>{
    let ctr = arrayData.length-1,index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
        
// And swap the last element with it
//         temp = arra1[ctr];
//         arra1[ctr] = arra1[index];
//         arra1[index] = temp;
        [arrayData[ctr],arrayData[index]] = [arrayData[index],arrayData[ctr]]
        // Decrease ctr by 1
        ctr--;
    }
    return arrayData;
}
