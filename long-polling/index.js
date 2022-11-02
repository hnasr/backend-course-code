const app = require("express")();
const jobs = {}

app.post("/submit", (req, res) =>  {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0;
    updateJob(jobId,0); 
    res.end("\n\n" + jobId + "\n\n");
})

app.get("/checkstatus", async (req, res) => {
    console.log(jobs[req.query.jobId])
    //long polling, don't respond until done
    while(await checkJobComplete(req.query.jobId) == false);
    res.end("\n\nJobStatus: Complete " + jobs[req.query.jobId] + "%\n\n")

} )

app.listen(8080, () => console.log("listening on 8080"));

async function checkJobComplete(jobId) {
    return new Promise( (resolve, reject) => {
        if (jobs[jobId] < 100)
            this.setTimeout(()=> resolve(false),  1000);
        else
            resolve(true);
    })
   
}

function updateJob(jobId, prg) {
    jobs[jobId] = prg;
    console.log(`updated ${jobId} to ${prg}`)
    if (prg == 100) return;
    this.setTimeout(()=> updateJob(jobId, prg + 10), 10000)
}