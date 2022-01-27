//Added leading semicolon to finish any pre-existing functionality
//IIFE start up to prevent clouding of the global window object
//Main loop will run the requestAnimationFrame fn to start a the game update loop

;({
    function(){
        function mainLoop(){
            window.requestAnimationFrame(mainLoop);


        }

        mainLoop();        
    }
})();