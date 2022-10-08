/**
 * Function to Print current page and then clear everything in the page.
 * @param {boolean} shouldClear - true if you want to clear the page after printing.
 * @return {null}
 */
function printAndClearPage(shouldClear) {
    console.log("Printing page");
    window.print();
    if (shouldClear) {
        console.log("Clearing the page");
        document.write('');
    }
}