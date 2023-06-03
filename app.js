var myArr=[] ;
var budget = 0;
var SNo  = 1;

var t_budget=document.getElementById('t_budget');
var t_expense=document.getElementById('t_expense');
var t_balance=document.getElementById('t_balance');



function getData(){
    var amount = document.getElementById("budget").value;
     budget=amount;
     t_budget.innerHTML=amount;
     t_balance.innerHTML=amount;
    document.getElementById("btn").setAttribute("disabled",true)
}

function viewData()
{
    var tbody = document.getElementById("table-expense");
    tbody.removeChild(tbody.lastElementChild);
    var result = "";
    var balnce = budget;
    var totalexpense =0;
     myArr.forEach(element => {
      totalexpense+=parseFloat(element.Amount);
      var left = balnce - element.Amount;
      result += "<tr><td>" + element.Title + " </td><td> " + element.Description +"</td><td>" + element.Amount + "/Remaining " +left +"</td><td>"+ element.Date +"</td><td style='display:none'>"+ element.ID +"</td><td><button id='edit'>Edit</button><button id='delete'>Delete</button></td></tr>";
      balnce = left;
    });
    t_expense.innerHTML=(totalexpense);
    t_balance.innerHTML=parseFloat(t_budget.innerHTML)-parseFloat(totalexpense);
     tbody.innerHTML = result;
}

function setData(){
  
  var hiddenId=document.getElementById("hidden").value;
  if(hiddenId == "0")
    {
      var expense=document.getElementById("expense").value;
      var date=document.getElementById("date").value;
      var amount=document.getElementById("amount").value;
      var discription=document.getElementById("discription").value;

  
      var list = {
          "Date" : date,
          "Amount" : amount,
          "Title" : expense,
          "Description" : discription,
          "ID": SNo,
      }
      myArr.push(list);
      SNo = SNo + 1;
    }
    else{
      console.log("Update")
      var expense=document.getElementById("expense").value;
      var date=document.getElementById("date").value;
      var amount=document.getElementById("amount").value;
      var discription=document.getElementById("discription").value;
      var hidden=document.getElementById("hidden").value;

      objIndex = myArr.findIndex((obj => obj.ID == Number(hidden)));

      myArr[objIndex].Date = date;
      myArr[objIndex].Amount = amount;
      myArr[objIndex].Title = expense;
      myArr[objIndex].Description = discription;
    }
    
    viewData();  
    
}

document.addEventListener('DOMContentLoaded', function() {
    var parentElement = document.getElementById('table-expense');
  
    parentElement.addEventListener('click', function(event) {
      var target = event.target;
      if (target.id == 'edit') {
        
        var tr = event.target.parentNode.parentNode;
        var child1 = tr.children.item(0).innerHTML;
        var child2 = tr.children.item(1).innerHTML;
        var child3 = tr.children.item(2).innerHTML;
        var child4 = tr.children.item(3).innerHTML;
        var child5 = tr.children.item(4).innerHTML;
        
        document.getElementById("expense").value =child1;
        document.getElementById("discription").value=child2;
        document.getElementById("amount").value=child3.split("/",1);
        document.getElementById("date").value = child4;
        document.getElementById("hidden").value=child5;
        document.getElementById('btw').focus()
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    var parentElement = document.getElementById('table-expense');
  
    parentElement.addEventListener('click', function(event) {
    
      var target = event.target;
      if (target.id == 'delete') {
        var tr = event.target.parentNode.parentNode;
        tr.remove();
        var id = event.target.parentNode.parentNode.children.item(4).innerHTML;
        objIndex = myArr.findIndex((obj => obj.ID == Number(id)));
        var filterArr = myArr.filter((item) => {return (item.ID !== Number(objIndex))});
        console.log(filterArr)
        myArr = filterArr;
        viewData();
      }

    });
  });
function clearData(){
  var expense=document.getElementById("expense").value=''
  var date=document.getElementById("date").value=''
  var amount=document.getElementById("amount").value=''
  var discription=document.getElementById("discription").value=''
  var hidden=document.getElementById("hidden").value='0'
  var amount = document.getElementById("budget").value=''
  }






