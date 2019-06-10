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

    Term.prototype.isNeg = function() {
        if (this.posOrNeg === '-') {
            this.coe = -this.coe;
        }
    };


    return {
        createTerms: function() {

            var getInput = UIController.getInput();

            // Creation of these terms could be moved to a private method
            // Leaving behinde the polynomial and csntTrmFactors

            var firstTerm = new Term(getInput.firstOption, getInput.leadTerm, 3);

            var secondTerm = new Term(getInput.secondOption, getInput.secTerm, 2);

            var thirdTerm = new Term(getInput.thirdOption, getInput.thrdTerm, 1);

            var lastTerm = new Term(getInput.lastOption, getInput.lastTerm, 0);

            protoInit();

            var polynomial = firstTerm.fullTerm + secondTerm.fullTerm + thirdTerm.fullTerm + lastTerm.fullTerm;
            console.log('P(x) =' + polynomial);

            var gettingTerms = calculationsController.constantTermFactors(getInput.lastTerm);
            gettingTerms(firstTerm.coe, secondTerm.coe, thirdTerm.coe, lastTerm.coe);

            function protoInit() {
                firstTerm.checkPower();
                firstTerm.isNeg();

                secondTerm.checkPower();
                secondTerm.isNeg();

                thirdTerm.checkPower();
                thirdTerm.isNeg();

                lastTerm.checkPower();
                lastTerm.isNeg();
            }
        }
    };

    // If factor store data
})();

var calculationsController = function() {

    return {
        constantTermFactors: function(k) {
            var factList = [];
            for (var i = 0; i <= k; i++) {
                if (k % i === 0) {
                    factList.push(-i);
                    factList.push(i);
                }
            }
            console.log(factList);

            return function(t1, t2, t3, t4) {
              var workingOut, solution;
                var list = factList;
                for (var i = 0; i < list.length; i++) {
                    var x = list[i];
                    var testingTerms = (t1 * Math.pow(x, 3)) + (t2 * Math.pow(x, 2)) + (t3 * Math.pow(x, 1)) + parseInt(t4); // t4 a string before this point, need to fix
                    if (testingTerms == 0) {
                        workingOut = 'P(' + x + ')' + ' = ' + t1 + '(' + x + ')3 ' + t2 + '(' + x + ')2 ' + t3 + '(' + x + ') ' + t4 + ' = 0';
                        solution = 'Therefore: (x' + '+' + (-x) + ') is a factor';
                        console.log(workingOut);
                        console.log(solution);

                        // for testing purposes should move to another controller
                        // Place in for loop to display on different lines
                        document.getElementById("working__out").innerHTML = workingOut;
                        document.getElementById("factors").innerHTML = solution;
                    }
                }
            };

        },

    };
}();

var controller = (function(UICtrl, dataCrtl, calcCtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMitems();

        document.querySelector(DOM.subBtn).addEventListener('click', createTerms);
    };

    var createTerms = dataCrtl.createTerms;

    return {
        init: function() {
            setupEventListeners();
        }
    };

})(UIController, dataController, calculationsController);

controller.init();
