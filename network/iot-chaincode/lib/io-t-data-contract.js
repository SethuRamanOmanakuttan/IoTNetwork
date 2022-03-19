/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;



function retrieveOUFromCert(certString){
    var re = new RegExp('/OU=([a-zA-Z]*)/');
    let matchString  =certString.match(re)
    if(matchString == null || matchString[1] == ''){
        throw new Error(`Organizational Unit not available`);
    }else{
        return matchString[1]
    }

}

function adminAuth(ctx){
    let cid = new ClientIdentity(ctx.stub);
    let data =  cid.getID()
    let OU = retrieveOUFromCert(data)
    if(OU.toLowerCase() != 'admin'){
        throw new Error(`Only Admin can invoke the following function`);
    }
}



class IoTDataContract extends Contract {




    async ioTDataExists(ctx, IoTDeviceId) {
        const buffer = await ctx.stub.getState(IoTDeviceId);
        return (!!buffer && buffer.length > 0);
    }

    async registerDevice(ctx,IoTDeviceId,timestamp){
        adminAuth(ctx)
        const exists = await this.ioTDataExists(ctx, IoTDeviceId);
        if (exists) {
            throw new Error(`The iot device ${IoTDeviceId} is already registered`);
        }
        const asset = { "Registered On" : timestamp };
        const buffer = Buffer.from(JSON.stringify(asset));
        let registerTxnData = Buffer.from(JSON.stringify({"Device":IoTDeviceId}))
        ctx.stub.setEvent('RegisterEvent', registerTxnData);
        await ctx.stub.putState(IoTDeviceId, buffer);
    }

    async addData(ctx, IoTDeviceId, timestamp, value) {
        const exists = await this.ioTDataExists(ctx, IoTDeviceId);
        if (!exists) {
            throw new Error(`The iot device ${IoTDeviceId} is not registered`);
        }
        let buffer = await ctx.stub.getState(IoTDeviceId);
        let asset = JSON.parse(buffer.toString());
        asset[timestamp] = value;
        buffer = Buffer.from(JSON.stringify(asset));
        let addTxnData = Buffer.from(JSON.stringify({"device ID" : IoTDeviceId,"timestamp" : timestamp,"value":value}))
        ctx.stub.setEvent('AddDataEvent', addTxnData);
        await ctx.stub.putState(IoTDeviceId, buffer);
    }

    async readData(ctx, IoTDeviceId) {
        const exists = await this.ioTDataExists(ctx, IoTDeviceId);
        if (!exists) {
            throw new Error(`The device ${IoTDeviceId} does not exist`);
        }
        const buffer = await ctx.stub.getState(IoTDeviceId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async deleteIoTData(ctx, IoTDeviceId) {
        adminAuth(ctx)
        const exists = await this.ioTDataExists(ctx, IoTDeviceId);
        if (!exists) {
            throw new Error(`The device ${IoTDeviceId} does not exist`);
        }
        let deleteTxnData  = Buffer.from(JSON.stringify({"Deleted Device" : IoTDeviceId}))
        ctx.stub.setEvent('DeleteEvent', deleteTxnData);
        await ctx.stub.deleteState(IoTDeviceId);
    }

    //Query data
    async QueryAssets(ctx, queryString) {
		return await this.GetQueryResultForQueryString(ctx, queryString);
	}

    async GetQueryResultForQueryString(ctx, queryString) {

		let resultsIterator = await ctx.stub.getQueryResult(queryString);
		let results = await this._GetAllResults(resultsIterator, false);

		return JSON.stringify(results);
	}

    async _GetAllResults(iterator, isHistory) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.txId;
					jsonRes.Timestamp = res.value.timestamp;
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}

}






module.exports = IoTDataContract;
