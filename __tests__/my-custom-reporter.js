const fs=require("fs")
const path=require("path")
class MyCustomReporter {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
      this.reportRes=[];
    }
    onTestResult(contexts, results){
        this.reportRes.push(results.testResults.map(r=>r.status+" "+r.fullName+"  "+r.title).join("\n"))
    }
    onRunComplete(){
        fs.writeFileSync(path.resolve(__dirname,"report.txt"),this.reportRes.join("\n"))
    }
}

module.exports = MyCustomReporter;