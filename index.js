
   
 function Myfunc() { 

var username = "Vivek-Sanjay-Shukla"
username = document.getElementById("userInput").value;

console.log(username);

const user = `https://api.github.com/users/${username}`;



fetch(user)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

    document.getElementById("userInfo").innerHTML = `
         
           <div class="avtar">
                <img src="${data.avatar_url}" alt="Avtar"> 
            </div>
           <div class="information">
               <h2>${data.name}</h2>
                <p>${data.bio ? data.bio:""}</p>
                 <p>${data.location ? data.location : ""}</p>
                 <p>${data.twitter_username ? data.twitter_username : ""}</p>
           </div>
             
    `;

      document.getElementById("userLink").innerHTML = `
            <span>${data.html_url}</span>    
    `;
     
  })
  .catch(error => {
        document.getElementById("userInfo").innerHTML = `
         
           <h1>No Results Found</h1>
             
    `;

     document.getElementById("userLink").innerHTML = `
            <span></span>    
    `;

    

     document.getElementById("cards").innerHTML = `
            <span></span>    
    `;
    console.error('Error:', error);
  });




const apiUrl = `https://api.github.com/users/${username}/repos`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
  
  
    data.forEach(d => {
          document.getElementById("cards").innerHTML += `
          <div class="card">
          <h2>${d.name}</h2>
          <p>${d.description ? d.description : ""}</p>
          <div id="languages${d.name}"></div>
          </div>
     `

      const api = `https://api.github.com/repos/${username}/${d.name}/languages`;

       fetch(api)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {

          let val = Object.keys(data);

          val.forEach((v) =>{
               document.getElementById(`languages${d.name}`).innerHTML += `
               <span>${v}</span>
          `
          });
        
          
        })
        .catch(error => {

             document.getElementById("cards").innerHTML = `
         
           <h1></h1>
             
    `;

          console.error('Error:', error);
        });
       

    });
    

    const itemsPerPage = 4;
    const content = document.getElementById('cards');
    const items = Array.from(content.children);
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(pageNumber) {
    
      
      const start = (pageNumber - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      items.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? 'block' : 'none';
      });
   
    }

     function createPaginationLinks() {
       
       document.getElementById("pagination").innerHTML = `<li></li>`;

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.classList.add(`page-link-${i}`);
        link.textContent = i;

        link.addEventListener('click', () =>{
          currPage = i;
         
           showPage(currPage);
  
        });
        li.appendChild(link);
        pagination.appendChild(li);
      }



    }

   

    showPage(1);

    // Create pagination links
    createPaginationLinks();
     
  })
  .catch(error => {
          document.getElementById("pagination").innerHTML = `
         
           <h1></h1>
             
    `;
    console.error('Error:', error);
  });



}