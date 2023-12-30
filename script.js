document.addEventListener('DOMContentLoaded', function() {
    let keys = document.querySelectorAll('.calculator button');
    let screen = document.querySelector('.screen');
    let decimal = false;
    let operators = ['+', '-', 'x', '÷'];

    keys.forEach(function(key) {
        key.addEventListener('click', function() {
            let keyVal = this.getAttribute('data-val');
            let output = screen.innerHTML;

            // clear
            if (keyVal === 'clear') {
                screen.innerHTML = '';
                decimal = false;
            }

            // equal
            else if (keyVal === '=') {
                let equation = output;
                let lastChar = equation[equation.length - 1];
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
                if (operators.indexOf(lastChar) > -1 || lastChar === '.')
                    equation = equation.replace(/.$/, '');
                if (equation) {
                    screen.innerHTML = eval(equation);
                }
                decimal = false;
            }

            // operators
            else if (this.parentNode.classList.contains('operators')) {
                let lastChar = output[output.length - 1];
                if (output !== '' && operators.indexOf(lastChar) === -1) {
                    screen.innerHTML += keyVal;
                } else if (output === '' && keyVal === '-') {
                    screen.innerHTML += keyVal;
                }
                if (operators.indexOf(lastChar) > -1 && output.length > 1) {
                    screen.innerHTML = screen.innerHTML.replace(/.$/, keyVal);
                }
                decimal = false;
            }

            // decimal
            else if (keyVal === '.') {
                if (!decimal) {
                    screen.innerHTML += keyVal;
                    decimal = true;
                }
            }

            // buttons
            else {
                if (output === '0') {
                    screen.innerHTML = keyVal;
                } else {
                    screen.innerHTML += keyVal;
                }
            }
        });
    });

    window.addEventListener('keydown', function(e) {
        let key;
        switch (e.which) {
            case 96:
                key = 0;
                break;
            case 97:
                key = 1;
                break;
            case 98:
                key = 2;
                break;
            case 99:
                key = 3;
                break;
            case 100:
                key = 4;
                break;
            case 101:
                key = 5;
                break;
            case 102:
                key = 6;
                break;
            case 103:
                key = 7;
                break;
            case 104:
                key = 8;
                break;
            case 105:
                key = 9;
                break;
            case 111:
                key = '÷';
                break;
            case 109:
                key = '-';
                break;
            case 106:
                key = 'x';
                break;
            case 107:
                key = '+';
                break;
            case 13:
                key = '=';
                break;
            case 110:
                key = '.';
                break;
            case 27:
                key = 'clear';
                break;
            default:
                return;
        }

        document.querySelector('[data-val="' + key + '"]').classList.add('active');
        document.querySelector('[data-val="' + key + '"]').click();
    });

    window.addEventListener('keyup', function() {
        let activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }
    });

    document.querySelector('[data-val="clear"]').click();
    setTimeout(function() {
        document.querySelector('[data-val="0"]').click();
        /*setTimeout(function() {
            document.querySelector('[data-val="5"]').click();
            setTimeout(function() {
                document.querySelector('[data-val="x"]').click();
                setTimeout(function() {
                    document.querySelector('[data-val="3"]').click();
                }, 200);
            }, 200);
        }, 200);*/
    }, 100);
});
