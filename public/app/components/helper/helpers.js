const helper = {
    convertDollarFormat : function(num) {
        let dollars = num / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
    },
    calculateDate : function(date){
        let today = new Date();
        let createdOn = new Date(date);
        let msInDay = 24 * 60 * 60 * 1000;

        createdOn.setHours(0,0,0,0);
        today.setHours(0,0,0,0)
        let diff = (+today - +createdOn)/msInDay
        return diff;
    },
    formatDate : function(date){
        let createdOn = new Date(date);
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
        
        let day = createdOn.getDate();
        let monthIndex = createdOn.getMonth();
        let year = createdOn.getFullYear();

        let formatDate = monthNames[monthIndex] + ' ' + day + ', ' + year
        return formatDate;
    } 
}

export default helper;