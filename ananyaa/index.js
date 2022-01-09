
var user_name = document.getElementById("name");
document.getElementById("btn-alert").addEventListener("click", function(){
    var name=user_name.value.trim();

    if(!name)
       {window.alert("Kindly mention name here.");
       console.log("Kindly mention name here.");
       document.write("Kindly mention name here.");
       window.print("Kindly mention name here.");
    }
    else
        {window.alert("Hey, " + name + "!\nWelcome to Swiggy i++ !");
        console.log("Hey, " + name + "!\nWelcome to Swiggy i++ !");
        document.write("Hey, " + name + "!\nWelcome to Swiggy i++ !");
        window.print("Hey, " + name + "!\nWelcome to Swiggy i++ !");
    }
       
});
