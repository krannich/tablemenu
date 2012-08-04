tablemenu
=========

jQuery plugin using Bootstrap, Font Awesome and Bootbox.js

In order to use this plugin you need to have the following components:

- Twitter Bootstrap (http://twitter.github.com/bootstrap)
- Font Awesome (http://fortawesome.github.com/Font-Awesome)
- Bootbox.js (http://bootboxjs.com)

(all components are included within the external folder)

Working with this plugin is as easy as 1-2-3:

## 1. Define your context menu:

var invoice_menu = {
	'width'				:   265,
	'column'			:   2,
	'position'		:   'right',
	'menu_items'	: {
		'del'	: {
			'url'			:   'delete/',
			'title'		:   'delete',
			'icon'		:   'icon-remove icon-big icon-red',
			'confirm'	:   'Do you want to delete <strong>invoice $(id)</strong> of cutsomer <strong>$(customer)</strong>?'
		}
	}
}

- width: 
You can specify a width (in px) of the context menu. If you do not provide this information, the width is calculated automatically.

- column:
The column defines where the context menu is attached to. The first column is 0!!!

- position:
This flag defines the position of the context menu. The following values are available: left, right, before, after. 

- menu_items:
Here you can define your context menu items. Give each item a unique name and specify the required parameters (url, title and icon).

A menu_item consists of the following flags:

- url:
You can specify any url you want. An ID is added automatically. You have to specify the ID in the table's el_data attribute.

- title:
Each button can have a title. The title is provided as a tooltip by using Twitter Bootstrap

- icon:
Here you define the styles of the buttons by providing the corresponding Twitter Bootstrap class names. You can combine several class names. (in dk.bootstrap.css you can find some additional button styles (e.g. sizes and colors).)

- confirm:
If you want, you can add an optional confirm dialog, before the action is triggered. You can insert placeholders for dynamic values. A placeholder looks like this: $(customer)
You have to provide a corresponding value in the el_data set.


## 2. Init plugin:

$(document).ready(function() {
   $('#invoices_table').tablemenu(invoice_menu);
});

You have to pass the menu variable to the tablemenu function.


## 3. Setup you data table

Each table row has to have some special attributes (el_data and el_options)

for example:

<tr el_data="{'id':'11567', 'customer':'Mr. Müller'}" el_options="{'print':1, 'paid':1, 'email':1, 'serial':1, 'del':0,'edit':1}">

- el_data:
You need this attribute for replacing the corresponding placeholders in your confirm dialogs.
The id flag is always mandatory! It is used to create the links of the buttons.

- el_options:
This attribute defines which of the previously defined button of your context menu are available for this particular table row. You can enable or disable a specific button (enabled buttons are visible and clickable, disabled buttons are visible and not clickable). 


# Explanation of files:
dk.bootstrap.css		overrides standard buttons
dk.tablemenu.css		styles for the context menu
dk.tablestyles.css	styles for the table
dk.tablemenu.js			the jQuery plugin
demo.html						tablemenu in action


Have fun!