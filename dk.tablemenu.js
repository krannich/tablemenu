/* Tablemenu
jQuery plugin using Twitter Bootstrap, Font Awesome and Bootbox.js 
--------------------------------------------------------------------------------------------

License
--------------------------------------------------------------------------------------------
The Font Awesome webfont, CSS, and LESS files are licensed under CC BY 3.0:
http://creativecommons.org/licenses/by/3.0/ A mention of
'Tablemenu - https://github.com/krannich/tablemenu' in human-readable
source code is considered acceptable attribution (most common on the web).
If human readable source code is not available to the end user, a mention in
an 'About' or 'Credits' screen is considered acceptable (most common in desktop
or mobile software).

Contact
--------------------------------------------------------------------------------------------
Email: dennis@krannich.de
Twitter: http://twitter.com/krannich
Work: http://krannich.de

*/

(function($){  

	var methods = {
	
		init : function(options) {
		
			var defaults = {
				button_width : 45,
				column: 0,
				position: 'left',
				trigger: 'mouseenter',
			};
			
			var settings = $.extend(defaults, options);
				
			if ($('#tablemenu_context_menu').length != 0) {
				alert ('Warning! You cannot have multiple instances of tablemenu_context_menu.');
			} else {
				$("body").append('<div id="tablemenu_context_menu"></div>');
			}		
			
				
			$('#tablemenu_context_menu').mouseleave(function() {
				$('#tablemenu_context_menu').hide();   
			});
			
			return this.each(function(e) {
				var o = options;
				var obj = $(this);               
				var items = $("tbody > tr", obj);
				
				items.mouseleave(function(e) {
					if (e.relatedTarget !=null && e.relatedTarget.id != "tablemenu_context_menu" && e.relatedTarget.parentNode.id !="tablemenu_context_menu") {
						$('#tablemenu_context_menu').hide();   
					}
				});
				
				items.bind(settings.trigger, function(e) {

					var menu_items = settings.menu_items;
					var control_width;
					var el_data = eval('([' + $(this).attr('el_data') + '])')[0];
					var el_options = eval('([' + $(this).attr('el_options') + '])')[0];
	
					$('#tablemenu_context_menu').html('');
					
					if (settings.width != null) {
						control_width = settings.width;
					} else {
						control_width = Object.keys(el_options).length * settings.button_width;
					}
										
					/*
					----- Create Menu -----
					*/
					$.each(menu_items, function(key, val) {
											
						if (el_options[key] != null) {
						
							var button = document.createElement('button');
							
							$(button).html('<i class="' + val.icon + '"></i>');

							if (val.title!= null) {
								$(button).attr('title', val.title);
							}	
							
							if (el_options[key]==0) {
								$(button).attr('disabled', 'disabled');
							}
							
							if (val.class_name != null) {
								$(button).addClass(val.class_name);
							} else {
								$(button).addClass("btn");
							}

							var url="";
							if (val.url!= null) { url += val.url; }	
							if (el_data.id != null) { url += el_data.id; }
							
							$(button).attr('url', url);
							
							if (val.confirm!= null) {
								var confirm_message = val.confirm;
								var placeholders = get_placeholders(confirm_message);
								
								$.each(placeholders, function(placeholder_key, placeholder_val) {
									replacement = el_data[placeholder_val];
									confirm_message = confirm_message.replace("$(" + placeholder_val +")", replacement);
								});

								$(button).bind('touchstart click', function() {
									bootbox.confirm(confirm_message, function(confirmed) {
										if (confirmed) { window.location.href = url; }
									});
								});
						
							} else {
								$(button).bind('touchstart click', function() {
									window.location.href = $(this).attr('url');
								});
							}
							
							$(button).attr('rel', 'tooltip');
							$("#tablemenu_context_menu [disabled!=disabled][rel=tooltip]").tooltip();

							$("#tablemenu_context_menu").append(button);
							
						}
					});			
					
					/*
					----- Output Menu -----
					*/
			        var bottomWidth = control_width +"px";
			        var bottomHeight = $(this).height()-1+"px";
			        var lineHeight = $(this).height()-3+"px";
			
					var row_position = $(this).position();
			
					var border_offset = 0;
					if (!$.browser.webkit) {
						border_offset = 1;
					}
					
					var num_of_child_elements = $(this).children().size();
					
					var append_column;
					var tablemenu_context_menu_position = 0;
					
					if (settings.column >= num_of_child_elements) {
						settings.column = num_of_child_elements-1;
						settings.position = "after";
					} else if (settings.column < 0) {
						settings.column = 0;
						settings.position = "before";
					}
										
					if (settings.position == "left") {
						append_column = $(this).children().eq(settings.column);
						tablemenu_context_menu_position = append_column.position().left;
						
					} else if (settings.position == "right") {
						append_column = $(this).children().eq(settings.column);
						tablemenu_context_menu_position = append_column.position().left + append_column.outerWidth() - 1 - control_width;
						
					} else if (settings.position == "after"){
						append_column = $(this).children().eq(num_of_child_elements-1);
						tablemenu_context_menu_position = append_column.position().left + append_column.outerWidth();

					} else if (settings.position == "before") {
						append_column = $(this).children().eq(settings.column);
						tablemenu_context_menu_position = append_column.position().left - 1 - control_width;
					}
					
					var bottomTop = row_position.top-border_offset;
					var bottomLeft = tablemenu_context_menu_position-border_offset;
					
					/*
					----- Output -----
					*/
					$('#tablemenu_context_menu').css({
					    top: bottomTop,
					    left: bottomLeft,
					    width: bottomWidth,
					    height: bottomHeight,
					    lineHeight: lineHeight,
					});		
										
					$('#tablemenu_context_menu').addClass(settings.position);
					
					$('#tablemenu_context_menu').show();
	
				});
			});
		},	
	
		stop : function() {
		
		},
		
		destroy: function() {
			
		}
	
	
	};
	
	function get_placeholders(str) {
		var regex = /\$\((\w+)\)/g;
		var result = [];
			    
		while (match = regex.exec(str)) {
	        result.push(match[1]);    
	    }
	    return result;
	}
	
	$.fn.tablemenu = function(method) {  
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method '+ method +' does not exist in tablemenu plugin.');
		}  
	}; 
	
})(window.jQuery);