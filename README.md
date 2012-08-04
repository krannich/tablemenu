tablemenu
=========

jQuery plugin using Bootstrap, Font Awesome and Bootbox.js



## Define your context menu:

var invoice_menu = {
	'width'         :   265,
	'column'        :   2,
	'position'      :   'right',
	
	'menu_items'    : {
	  	'del' : {
	            'url'           :   'delete/',
	            'title'         :   'delete',
	            'icon'          :   'icon-remove icon-big icon-red',
	            'confirm'       :   'Do you want to delete <strong>invoice $(id)</strong> of cutsomer <strong>$(customer)<\/strong>?',
	            
	        }
	}
}



## Init plugin:

$(document).ready(function() {
   $('#invoices_table').tablemenu(invoice_menu);
});




