var UIController = (function() {

    var DOMitems = {
        firstOption: '1st_option',
        leadTerm: 'lead_trm',
        secondOption: '2nd_option',
        secTerm: 'sec_term',
        thirdOption: '3rd_option',
        thrdTerm: 'thrd_term',
        lastOption: '4th_option',
        lastTerm: 'last_term',
        subBtn: '.sub-poly'
    };

    return {
        getInput: function() {
            return {
                firstOption: document.getElementById(DOMitems.firstOption).value,
                leadTerm: document.getElementById(DOMitems.leadTerm).value,

                secondOption: document.getElementById(DOMitems.secondOption).value,
                secTerm: document.getElementById(DOMitems.secTerm).value,

                thirdOption: document.getElementById(DOMitems.thirdOption).value,
                thrdTerm: document.getElementById(DOMitems.thrdTerm).value,

                lastOption: document.getElementById(DOMitems.lastOption).value,
                lastTerm: document.getElementById(DOMitems.lastTerm).value
            };
        },
        
        getDOMitems: function() {
            return DOMitems;
        }
    };
    
    // Add new items to UI
})();

var dataController = (function() {
    // Add new input values to data
    var Term = function(posOrNeg ,coe, power) {
        this.posOrNeg = posOrNeg;
        this.coe = coe;
        this.power = power;
    };

    Term.prototype.checkPower = function() {
        if (this.power === 0) {
          this.fullTerm = ' ' + this.posOrNeg + this.coe;
        } else {
            this.fullTerm = ' ' + this.posOrNeg + this.coe + '(x)' + this.power;
        }
    };


    return {
        createTerms: function() {

            var getInput = UIController.getInput();

            // Creation of these terms could be moved to a private method
            // Leaving behinde the polynomial and csntTrmFactors 
            var firstTerm = new Term(getInput.firstOption, getInput.leadTerm, 3);
            firstTerm.checkPower();
            //console.log(firstTerm);

            var secondTerm = new Term(getInput.secondOption, getInput.secTerm, 2);
            secondTerm.checkPower();
            //console.log(secondTerm);

            var thirdTerm = new Term(getInput.thirdOption, getInput.thrdTerm, 1);
            thirdTerm.checkPower();
            //console.log(thirdTerm);

            var lastTerm = new Term(getInput.lastOption, getInput.lastTerm, 0);
            lastTerm.checkPower();

            var polynomial = firstTerm.fullTerm + secondTerm.fullTerm + thirdTerm.fullTerm + lastTerm.fullTerm;
            console.log(polynomial);
            calculationsController.constantTermFactors(getInput.lastTerm);
        }
    };

    // If factor store data
})();

var calculationsController = function() {
    
    return {
        // Method needs to be adjusted to accomodate for -ve values
        constantTermFactors: function(k) {
            for (var i = 0; i <= k; i++) {
                if (k % i === 0) {
                    console.log(i);
                }
            }
        }
    };

}();

var controller = (function(UICtrl, dataCrtl, calcCtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMitems();
        
        document.querySelector(DOM.subBtn).addEventListener('click', createTerms);
        document.querySelector(DOM.subBtn).addEventListener('click', cnstTrmFactors);
        
        
    };

    var cnstTrmFactors  = calcCtrl.constantTermFactors;
    var createTerms = dataCrtl.createTerms;
    

    return {
        init: function() {
            setupEventListeners();
        }
    };

})(UIController, dataController, calculationsController);

controller.init();

