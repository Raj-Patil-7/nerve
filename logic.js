let selected_date= null; 
let listof_date = ['24-Apr-2024','02-May-2024','09-May-2024','31-May-2024','21-Jun-2024'];
let selected_tab = null;
const strategy_data = {
    tabs: {
        Bullish:{
            '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','SpreadStrategy','Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
            '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put'],
        },

        Bearish:{
            '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','Long Put','Long Put','Bear Call Spread'],
            '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put'],
            '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','Long Put'],
        },

        RangeBound:{
            '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','SpreadStrategy','Short Straddle'],
            '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
            '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor'],

        },

        Volatile:{
            '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
            '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
            '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle'],

        }
    }
    
}


document.addEventListener('DOMContentLoaded', function() { 
    
    document.getElementById("defaultoption").click(); 
    fill_dropdown('dropdown_items1'); // fill the first dropdown when the dom is loaded
    fill_dropdown('dropdown_items2'); 
    fill_dropdown('dropdown_items3');
    fill_dropdown('dropdown_items4'); 

    auto_select_first_date('dropdown_items1');
    
});
/*document.getElementById("Bullish").style.display = "block";*/

function tabclicked(arr, optionname){

    //to clear eveythng once swtich to new tab
    const list_area =  document.getElementById("strategy_count_list");

        list_area.innerHTML = "";

    var i, contentList, tabslist;
    selected_tab = optionname;
    //console.log("this is option name: " + selected_tab);
    contentList = document.getElementsByClassName("tabcontent");


    for (i=0; i<contentList.length; i++){ 
        contentList[i].style.display="none"; 
    }

    tabslist = document.getElementsByClassName("clicktab");
    for(i=0; i<tabslist.length; i++){ 
        tabslist[i].className = tabslist[i].className.replace(" active", "");
    }
    document.getElementById(optionname).style.display="block"; 
    arr.currentTarget.className += " active";

    const dropdownelement = document.getElementById(`${optionname}`);
    if (dropdownelement) {
        const dropdownItems = dropdownelement.getElementsByTagName('a');
        if (dropdownItems.length > 0) {
            select_date(dropdownItems[0], dropdownItems[0].parentElement.previousElementSibling, false);
        }
    } 

    
}



//to open and close the dropdown
function open_dropdown(button){ 

    const classthat_moves = document.getElementById("stratclass");


    var dropdownby_Contentid=button.getAttribute("data-dropdown-id");
    //console.log(dropdownby_Contentid);
    var dropdowndates= document.getElementById(dropdownby_Contentid);
    //console.log(dropdowndates);
    
    if (dropdowndates) {
        dropdowndates.classList.toggle("show"); // Show the items from the dropdown
        button.classList.toggle("active"); // Show the button is active
    }


    //to move tge section down after opening the dates dropdown.
    
    if (dropdowndates.classList.contains("show")) {
        console.log("dropdown is checked if show is present");
        classthat_moves.classList.add("move-down");
    } else {
        classthat_moves.classList.remove("move-down");
    } 



}

function fill_dropdown(id){
    var dropdownitems= document.getElementById(id);
    
    if (dropdownitems) {
        listof_date.forEach(function(item) {
            var a = document.createElement("a");
            a.href = "#";
            a.textContent = datewith_nohypen(item);
            a.setAttribute("data-value", item); //to keep the value as same in array.
            a.onclick = function() { //this create a a onclick fucntion on all a list items
                select_date(a, dropdownitems.previousElementSibling);
                
            };
            dropdownitems.appendChild(a);
        });
    } else {
        console.error("Element not found.");
    }
}



function select_date(element, button, opendropdown=true){
    //first removing the selected class from all the itms. 
    var list_items = element.parentElement.querySelectorAll(".dropdown_content a");
    list_items.forEach(function(item){ 
        item.classList.remove("selected"); 
    });


    //adding the selected class to the clicked item 
    element.classList.add("selected");


    //updating the button to show the selected value 
    button.textContent = element.textContent;

    //store the current selected value 
    selected_date = element.getAttribute("data-value");
    
    //console.log("we are here" +selected_tab);


    //close the dropdown 
    if(opendropdown){
        open_dropdown(button);
    }
    //open_dropdown(button);
    the_selected_date();
    main_strategy_countfn();


}


function the_selected_date(){ 
    if(selected_date !== null){ 
        console.log("Selected Date: " + selected_date); 
    }else{ 
        console.log("No date selected"); 
    } }



function datewith_nohypen(datestring) {
    return datestring.replace(/-/g, ' ');
}





    function count_strategy(strategy_name, selected_date){
        const strategy_occurences={};

        if(strategy_data.tabs[strategy_name] && strategy_data.tabs[strategy_name][selected_date]){
            strategy_data.tabs[strategy_name][selected_date].forEach(item => {
                strategy_occurences[item] = (strategy_occurences[item] || 0) + 1 ;
            });
        }
        console.log("we have counted");
        return strategy_occurences;


    }




    function list_strategies(strategy_name, selected_date){
        const count_occurence = count_strategy(strategy_name, selected_date);
        console.log("we are in list strategies" + count_occurence);
        if(count_occurence.length > 1){
            console.log("No Strategies found");
        }
        const list_area =  document.getElementById("strategy_count_list");

        list_area.innerHTML = "";

        for(const strategy in count_occurence){
            console.log("we are in for loop" );
            const strategylist_item = document.createElement("div");
            strategylist_item.classList.add("strategy_class");

            const strategy_name = document.createElement("span");
            strategy_name.textContent= strategy;

            const strategy_count = document.createElement("span");
            strategy_count.classList.add("strategy_count");

            if(count_occurence[strategy] > 1){
                console.log("this is count here" +count_occurence[strategy]);
                strategy_count.textContent = `${count_occurence[strategy]} Strategies`;
            }else{
                strategy_count.textContent = `${count_occurence[strategy]} Strategy`;
            }

            


            strategylist_item.appendChild(strategy_name);
            strategylist_item.appendChild(strategy_count);
            list_area.appendChild(strategylist_item);

        }

        if(list_area.innerHTML === ""){
            const no_strategy = document.createElement("div");
            no_strategy.classList.add("no_strategy");
            no_strategy.textContent = "There are no Strategies for " + selected_date;
            list_area.appendChild(no_strategy);
        }

    }




    function main_strategy_countfn(){
        const strategy_name = selected_tab;
        const current_date = selected_date;
        list_strategies(strategy_name, current_date);
    }

    function auto_select_first_date(dropdownid) {
        const dropdownItems = document.getElementById(dropdownid).getElementsByTagName('a');
        if (dropdownItems.length > 0) {
            select_date(dropdownItems[0], dropdownItems[0].parentElement.previousElementSibling, false);
        }
    }