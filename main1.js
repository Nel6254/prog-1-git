$(document).ready(function () { 
  
    // FETCHING DATA FROM JSON FILE 
    $.getJSON("vielas.json",  
            function (data) { 
        var item = ''; 

        // ITERATING THROUGH OBJECTS 
        $.each(data, function (key, value) { 

            //CONSTRUCTION OF ROWS HAVING 
            // DATA FROM JSON OBJECT 
            item += '<tr>'; 
            item += '<td>' +  
                value.apakstips + '</td>'; 

            item += '<td>' +  
                value.daudzums + '</td>'; 

            item += '<td>' +  
                value.id + '</td>'; 

            item += '<td>' +  
                value.komentari + '</td>'; 

            item += '<td>' +  
                value.komentari + '</td>';

            item += '<td>' +  
                value.mervienibas + '</td>'; 

            item += '<td>' +  
                value.nosaukums + '</td>'; 

            item += '<td>' +  
                value.skaits + '</td>'; 

            item += '<td>' +  
                value.tips + '</td>';    
                
            item += '</tr>'; 
        }); 
          
        //INSERTING ROWS INTO TABLE  
        $('#table').append(item); 
    }); 
}); 