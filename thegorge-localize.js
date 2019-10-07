var loc_strings = {
    "English": {
				//right column
        "label_offering": "Offering",
        "label_craving": "Satisfies Craving",
	
        "label_default_recipes": "Default Recipe",
		"label_recipes": "Top Recipes",
		"label_bonuses": "Bonuses",

				// station tab
        "pot": "Cookpot",
        "spot": "Portable Cookpot",
		"ds": "Don't Starve",
		"rog": "Reign of Giants",
		"sw": "Shipwrecked",
		"ham": "Hamlet",
		
		"dst": "Don't Starve Together",
				// maiin tabs
        "all": "All",
        "veggie": "Veggie",
        "meat": "Meat",
        "other": "Other",
				
				// ingredients
        "quagmire_foliage_cooked": "Foliage",
		
				// dishes
			//DS+T
        "dish1": "Bacon and Eggs",
        "dish2": "Butter Muffin",
        "dish3": "Dragonpie",
        "dish4": "Fish Tacos",
        "dish5": "Fishsticks",
        "dish6": "Froggle Bunwich",
        "dish7": "Fruit Medley",
        "dish8": "Fist Full of Jam",
        "dish9": "Honey Ham",
        "dish10": "Honey Nuggets",
        "dish11": "Kabobs",
        "dish12": "Mandrake Soup",
        "dish13": "Meatballs",
        "dish14": "Meat Stew",
        "dish15": "Monster Lasagna",
        "dish16": "Pierogi",
        "dish17": "Powdercake",
        "dish18": "Pumpkin Cookies",
        "dish19": "Ratatouille",
        "dish20": "Stuffed Eggplant",
        "dish21": "Taffy",
        "dish22": "Turkey Dinner",
        "dish23": "Unagi",
        "dish24": "Waffles",
        "dish25": "Wet Goop",
			//RoG+T
        "dish26": "Ice Cream",
        "dish27": "Flower Salad",
        "dish28": "Guacamole",
        "dish29": "Melonsicle",
        "dish30": "Spicy Chili",
        "dish31": "Trail Mix",
			//SW
        "dish32": "Jely-O Pop",
        "dish33": "California Roll",
        "dish34": "Bisque",
        "dish35": "Coffee",
        "dish36": "Seafood Gumbo",
        "dish37": "Mussel Bouillabaise",
        "dish38": "Lobster Bisque",
        "dish39": "Lobster Dinner",
        "dish40": "Sweet Potato Souffle",
        "dish41": "Surf'n'Turf",
        "dish42": "Shark Fin Soup",
        "dish43": "Fresh Fruit Crepes", //Warly+DST
        "dish44": "Banana Pop", //DST
        "dish45": "Ceviche",
        "dish46": "Monster Tartare", //Warly+DST
        "dish47": "Caviar",
        "dish48": "Tropical Bouillabaisse",
			//Ham
        "dish49": "Iced Tea",
        "dish50": "Hard Shell Tacos",
        "dish51": "Gummy Cake",
        "dish52": "Feijoada",
        "dish53": "Nettle Rolls",
        "dish54": "Steamed Ham Sandwich",
        "dish55": "Snake Bone Soup",
        "dish56": "Tea",
        "dish57": "Asparagus Soup", //DST
        "dish58": "(Spicy) Vegetable Stinger", //DST
			//DST
        "dish59": "Jellybeans",
        "dish60": "Hot Dragon Chili Salad",
        "dish61": "Glow Berry Mousse", //Warly
        "dish62": "Grim Galette", //Warly
        "dish63": "Bone Bouillon", //Warly
        "dish64": "Asparagazpacho",
        "dish65": "Creamy Potato Purée",
        "dish66": "Fancy Spiralled Tubers",
        "dish67": "Fish Cordon Bleu",
        "dish68": "Salsa Fresca",
        "dish69": "Puffed Potato Soufflé",
        "dish70": "Moqueca",
        "dish71": "Stuffed Pepper Poppers",
        "dish72": "Volt Goat Chaud-Froid",
    }
}

var loc_selected_language = "English";

function GorgeRecipebookLocalize() {

    // Add language buttons
    var btn_language_div = document.createElement("div");
    $(btn_language_div).attr('class', 'btn_language_div');
    for (var language in loc_strings) {
        let button = document.createElement("div");
        $(button).attr('class', "button language_btn");
        $(button).attr('for', language);
        $(button).text(language);
        $(btn_language_div).append(button);
    }
    $('.recipelist').append(btn_language_div);

    // Look for a cookie
    var language = loc_get_cookie("language");
    if (language != null && loc_strings[language] != null) loc_set_language(language);

    // Select the corresponding button
    $(".language_btn[for='" + loc_selected_language + "']").addClass("selected");

    // Setup button listener
    $('.language_btn').on('click', e => {
        // Unselect others
        $('.language_btn').removeClass('selected');

        $(e.target).addClass('selected');

        loc_set_language($(e.target).attr("for"));
    });
}

function loc_set_language(language_key) {
    loc_selected_language = language_key;

    // Update craving buttons
    var craving_elems = $('.btn_cat_div label.button');
    for (var i = 0; i < craving_elems.length; i++) {
        $(craving_elems[i]).text(loc_string($(craving_elems[i]).attr('for')));
    }
    for (let key in craving_names) {
        craving_names[key] = loc_string(key);
    }

    // Update stations
    var station_elems = $('.btn_station_div label.button');
    for (var i = 0; i < station_elems.length; i++) {
        $(station_elems[i]).text(loc_string($(station_elems[i]).attr('for')));
    }
    for (let key in cooking_station_names) {
        cooking_station_names[key] = loc_string(key);
    }

    // Update Info
    $('.dish-tribute > label:first').text(loc_string('label_offering'));
    $('.dish-plate > label:first').text(loc_string('label_silveroffering'));
    $('.dish-craving > label:first').text(loc_string('label_craving'));
    $('.dish-station > label:first').text(loc_string('label_stations'));
    $('.dish-recipes > label:first').text(loc_string('label_recipes'));
    $('.dish-finder > label:first').text(loc_string('label_cook'));

    // Update Dish title
    $('.recipelist-dishes > li').each((_, e) => {
        let index = Number.parseInt($(e).data('index'));
        $(e).attr('title', discovered_dishes[index].name);
    });

    // Update translatable text elements
    var elements = $("[i18n-text]");
    for (let i = 0; i < elements.length; i++) {
        let key = $(elements[i]).attr("i18n-text");
        $(elements[i]).text(loc_string(key));
    }

    // Update translatable title elements
    var elements = $("[i18n-title]");
    for (let i = 0; i < elements.length; i++) {
        let key = $(elements[i]).attr("i18n-title");
        let arg = $(elements[i]).attr("i18n-argument");
        let title = loc_string(key);
        if (arg) {
            title = title.replace('%1', arg);
        }
        $(elements[i]).attr("title", title);
    }


    // Set a cookie
    loc_set_cookie("language", loc_selected_language, 6);
}

function loc_set_cookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loc_get_cookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function has_loc_string(key) {
    return key in loc_strings[loc_selected_language];
}

function loc_string(key) {
    return loc_strings[loc_selected_language][key] ||
        loc_strings["English"][key] || "Invalid String";
}
