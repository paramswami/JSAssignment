
function clearFun()
{
  document.getElementById("spEmail").innerHTML = "";
  document.getElementById("spFname").innerHTML = "";
  document.getElementById("spLname").innerHTML = "";
  document.getElementById("spAddress").innerHTML = "";
  document.getElementById("spGender").innerHTML = "";

}

function clearLoginFun()
{
  document.getElementById("sploginEmail").innerHTML ="";
  document.getElementById("spPassword").innerHTML = "";
}

function clearTodo()
{
  document.getElementById("spTodo").innerHTML ="";
}

function validation(email,fName,lName,address,gender)
{
  var required = true;

  if(email == null || email == "")
  {
    document.getElementById("spEmail").innerHTML = "Please enter email id."
    required = false;
  }
  else{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      required = true;
    }
    else{
      document.getElementById("spEmail").innerHTML = "Please enter valid email id."
      required = false;
    }
  }
  
  if(fName == null || fName == "")
  {
    document.getElementById("spFname").innerHTML = "Please enter first name."
    required = false;
  }
  else{
    var letters = /^[A-Za-z]+$/;
    if(fName.match(letters))
    {
      required = true;
    }
    else{
      document.getElementById("spFname").innerHTML = "Please enter alphabet characters only."
      required = false;
    }
  }

  if(lName == null || lName == "")
  {
    document.getElementById("spLname").innerHTML = "Please enter last name."
    required = false;
  }
  else{
    var letters = /^[A-Za-z]+$/;
    if(lName.match(letters))
    {
      required = true;
    }
    else{
      document.getElementById("spLname").innerHTML = "Please enter alphabet characters only."
      required = false;
    }
  }

  if(address == null || address == "")
  {
    document.getElementById("spAddress").innerHTML = "Please enter address."
    required = false;
  }

  if(gender == null || gender == "")
  {
    document.getElementById("spGender").innerHTML = "Please select gender."
    required = false;
  }
  return required;

}

function checkDuplicateUser(email)
{
  try {
     let registerTask = localStorage.getItem("registerTable");
    
        if(registerTask != null)
        {
          registerObj = JSON.parse(registerTask);
        
          var userFound = false;

           for (let i = 0; i < registerObj.length; i++) {

            if(registerObj[i][0].email == email)
            {
              userFound = true;
            }
          } 
      }

      return userFound;
    
  } catch (error) {
       alert(error);
  }
}

function registerFunc()
{
  try {

        let email = document.getElementById("email").value;
        let fName = document.getElementById("fName").value;
        let lName = document.getElementById("lName").value;
        let address = document.getElementById("address").value;

        let gender  , password = "admin"; 

        if (document.getElementById('rbMale').checked) {
          gender = "Male";
        }
        else if (document.getElementById('rbfemale').checked){
          gender = "Female";
        }     

        var required = validation(email,fName,lName,address,gender);
        var userFound = checkDuplicateUser(email);

        if(required)
        {

          if(userFound)
          {
              alert("User already exists, please use different email address.")
          }
          else{
            let registerTask = localStorage.getItem("registerTable");

            if(registerTask == null)
            {
              registerObj = [];
            }
            else{
              registerObj = JSON.parse(registerTask);
            }

            var profileImg  = sessionStorage.getItem("profileImg");

            sessionStorage.removeItem("profileImg");
          
            registerObj.push([{
              email,
              fName,
              lName,
              gender,
              address,
              password,
              profileImg,
              todo: [],
              }]);

            localStorage.setItem("registerTable" , JSON.stringify(registerObj));

            alert("User Registration Successful!! Please Login.")

            location.replace("Login.html")
         }

        }

       } catch (error) {
        alert(error);
    }
}

function GetProfile()
{
  let registerTask = localStorage.getItem("registerTable");

  var sessionUserName = sessionStorage.getItem("username");

  if(sessionUserName == null || sessionUserName == "")
  {
    location.replace("Login.html")
  }
  else{   

     if(registerTask == null)
     {
       registerObj = [];
     }
     else{
       registerObj = JSON.parse(registerTask);

     }

     for (let i = 0; i < registerObj.length; i++) {

      if(registerObj[i][0].email == sessionUserName)
      {
        document.getElementById("email").value = registerObj[i][0].email;
        document.getElementById("fName").value = registerObj[i][0].fName; 
        document.getElementById("lName").value = registerObj[i][0].lName;
        document.getElementById("address").value = registerObj[i][0].address;

        if(registerObj[i][0].gender == "Male")
        {

         document.getElementById("rbMale").checked = true;
        }
        else{
          document.getElementById("rbfemale").checked = true;
        }

        if(registerObj[i][0].profileImg != null || registerObj[i][0].profileImg != "")
        {

        document.getElementById('divProfile').style="margin-top: -217px;";

        document.getElementById("myImgProfile").setAttribute("src",registerObj[i][0].profileImg);

        }

      }
    }

  }
}

function UpdateProfile()
{
  try {

    let registerTask = localStorage.getItem("registerTable");
    var sessionUserName = sessionStorage.getItem("username");

    let email = document.getElementById("email").value;
    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let address = document.getElementById("address").value;

    if (document.getElementById('rbMale').checked) {
      gender = "Male";
    }
    else{
      gender = "Female";
    }

     if(registerTask == null)
     {
       registerObj = [];
     }
     else{
       registerObj = JSON.parse(registerTask);

     }

     let registerTaskJson = JSON.parse(localStorage.getItem("registerTable"));  
 
    for (let i = 0; i < registerObj.length; i++) {
 
     if(registerObj[i][0].email == sessionUserName)
     {
       registerTaskJson[i][0].fName = fName;
       registerTaskJson[i][0].lName = lName;
       registerTaskJson[i][0].address = address;
       registerTaskJson[i][0].gender = gender;
     }
   }
 
     localStorage.setItem("registerTable" , JSON.stringify(registerTaskJson));
     alert("User Profile Updated Successfully.")
     location.replace("Dashboard.html")
    
  } catch (error) {
    alert(error);
  }

}

function tblList()
{

  try {
    
  let registerTask = localStorage.getItem("registerTable");

      if(registerTask == null)
      {
        registerObj = [];
      }
      else{
        registerObj = JSON.parse(registerTask);

      }

      let html = '';
      let registerTbl = document.getElementById("bindtble");

      html += "<tr><th>Email</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>Action</th></tr>";

     for (let i = 0; i < registerObj.length; i++) {     
           
       html += '<tr> <td>'+ registerObj[i][0].email+ '</td><td>'+ registerObj[i][0].fName+'</td><td>'+ registerObj[i][0].lName+'</td><td>'+ registerObj[i][0].gender+'</td><td><button type="submit">Edit</button></td> </tr>';
       
     }   

      registerTbl.innerHTML = html;

    } 
    catch (error) {
       alert(error);
    }
     
}

  //  Login Method

  function loginFunc()
  {
    try {

      let logEmail = document.getElementById("email").value;
      let logPassword = document.getElementById("password").value;
      var loginReq = true;

      if(logEmail == null || logEmail == "")
      {
        document.getElementById("sploginEmail").innerHTML = "Please enter email/user name."
        loginReq = false;
      }

      if(logPassword == null || logPassword == "")
      {
        document.getElementById("spPassword").innerHTML = "Please enter email/user name."
        loginReq = false;
      }

      if(loginReq)
      {
    
      let registerTask = localStorage.getItem("registerTable");
    
       if(registerTask == null)
       {
         registerObj = [];
       }
       else{
         registerObj = JSON.parse(registerTask);
       }
 
       var userFound = false;

       for (let i = 0; i < registerObj.length; i++) {

            if(registerObj[i][0].email == logEmail && registerObj[i][0].password == logPassword)
            {
              userFound = true;
            }
       }

          if(userFound)
          {         

            sessionStorage.setItem("username", logEmail);

            location.replace("Dashboard.html")
          }
          else{
            alert("Login Failed: Invalid username or password.")
          }

        }

    } catch (error) {
         alert(error);
    }
  }

  function logout()
  {
    var sessionUserName = sessionStorage.getItem("username");

    sessionStorage.removeItem("username");

    location.replace("Login.html")
  }

  // Bind User ToDo List
  function BindTodo()
  {

    try {
   
    var sessionUserName = sessionStorage.getItem("username");

    if(sessionUserName == null || sessionUserName == "")
    {
      location.replace("Login.html")
    }
    else{

      let registerTask = localStorage.getItem("registerTable");

      if(registerTask == null)
      {
        registerObj = [];
      }
      else{
        registerObj = JSON.parse(registerTask);

      }

      let html1 = '';
      let todoTbl = document.getElementById("todotable");

      html1 += '<tr><th onclick="sortTable(0)" style="display:none";>to do id</th><th onclick="sortTable(1)">todo Name</th><th>Action</th></tr>'; 

      for (let i = 0; i < registerObj.length; i++) {

        if(registerObj[i][0].email == sessionUserName)
        {
          for (let j = 0; j < registerObj[i][0].todo.length; j++) {
        
            console.log(registerObj[i][0].todo.length); 

            var count  = j + 1;
              
          html1 += '<tr> <td  style="display:none"; >'+ count + '</td><td>'+ registerObj[i][0].todo[j].todoName+'</td><td><button type="submit" onclick="GetToDoFunc('+j+', \'' + registerObj[i][0].todo[j].todoName + '\')" >Edit</button> &nbsp;&nbsp; <button type="submit" onclick="DeleteToDoFunc('+ j  +')" >Delete</button></td> </tr>';
          
        }
        }
    }

    todoTbl.innerHTML = html1;
 }

} catch (error) {
        alert(error);
}

}

function ToDoFunc(btnVal)
{
  try {

    let todoItem = document.getElementById("txtTodo").value;

    var todoReq = true;

    if(todoItem == null || todoItem == "")
    {
      document.getElementById("spTodo").innerHTML = "Please enter todo."
      todoReq = false;
    }

    if(todoReq)
    {
        var sessionUserName = sessionStorage.getItem("username");

        let registerTask = localStorage.getItem("registerTable");

          if(registerTask == null)
          {
            registerObj = [];
          }
          else{
            registerObj = JSON.parse(registerTask);
          }

        let registerTaskJson = JSON.parse(localStorage.getItem("registerTable"));  

      for (let i = 0; i < registerObj.length; i++) {

        if(registerObj[i][0].email == sessionUserName)
        {
          var index;

          if(btnVal == "add")  //Add New Todo Item
          {
          index = registerObj[i][0].todo.length;

          var newItem = {
            SrNo : index + 1,
            todoName : todoItem
          };

          registerTaskJson[i][0].todo.push(newItem);

        } 
        else if(btnVal =="edit")  //Edit Todo Item
        {
          index = document.getElementById("editIndex").value;

          registerTaskJson[i][0].todo[index].todoName = todoItem;
        }

        }
      }

        localStorage.setItem("registerTable" , JSON.stringify(registerTaskJson));

        BindTodo();

        if(btnVal == "add") 
        {
          alert("Record Successfully added.");
        }
        else if(btnVal =="edit") 
        {
          alert("Record Successfully updated.");
          
        }
        location.reload();
      }
    
  } catch (error) {
       alert(error);
  }
  
}


function GetToDoFunc(index , todoValue)
{

 document.getElementById("btnAddtodo").style.display = "none";
 document.getElementById("btnEdittodo").style.display = "block";
 
 document.getElementById("editIndex").value = index;
 document.getElementById("txtTodo").value = todoValue;

}

function DeleteToDoFunc(index)
{
 try {
   

  var sessionUserName = sessionStorage.getItem("username");

    let registerTask = localStorage.getItem("registerTable");

      if(registerTask == null)
      {
        registerObj = [];
      }
      else{
        registerObj = JSON.parse(registerTask);
      }

    let registerTaskJson = JSON.parse(localStorage.getItem("registerTable"));  

   for (let i = 0; i < registerObj.length; i++) {

    if(registerObj[i][0].email == sessionUserName)
    {
      
    var obj = registerTaskJson[i][0].todo[index];
    console.log(obj);

    registerTaskJson[i][0].todo.splice(index, 1);

      localStorage.setItem("registerTable" , JSON.stringify(registerTaskJson));
    }

 }

    BindTodo();

    alert("Record Successfully deleted.");

  } catch (error) {
     alert(error);
  }
  
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("todotable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


function SearchFun() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("txtSearch");
  filter = input.value.toUpperCase();
  console.log(filter);
  table = document.getElementById("todotable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


// window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
         // img.onload = imageIsLoaded;

          document.getElementById('divReg').style="margin-top: -217px;";

          const reader = new FileReader();
          reader.addEventListener("load", () => {
              //console.log(reader.result);
              sessionStorage.setItem("profileImg", reader.result);
          })
          reader.readAsDataURL(this.files[0]);
      }
  });
// });

