const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    console.log('Contract deployed to:', waveContract.address);
    // console.log("Contract is deployed by: ", owner.address);


    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    const waveTxn = await waveContract.wave('This is wave #1');
    await waveTxn.wait();


    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave('Hello again!');
    // await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    //     // waveCount = await waveContract.getTotalWaves();

    //     // waveTxn = await waveContract.connect(randomPerson).wave();
    //     // await waveTxn.wait();

    //     // waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
