const schedule = require('node-schedule');
let { init } = require('./index.js');


/* // 每分钟第30秒执行
 schedule.scheduleJob('30 * * * * *',()=>{
    init()
}); */
console.log(process.argv.slice(-1)[0])
try {
    if (process.argv.slice(-1)[0] == 'task') {
        // 每周-到周五 9:30执行
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(1, 6)];
        rule.hour = 9;
        rule.minute = 30;
        schedule.scheduleJob(rule, function () {
            init()
        });
    }
    if (process.argv.slice(-1)[0] == 'init') {
        init()
    }
} catch (error) {
    
    console.error(error)

}
