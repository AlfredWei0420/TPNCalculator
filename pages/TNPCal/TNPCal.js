// pages/TNPCal/TNPCal.js
Page({

  /**
   * Page initial data
   */
  data: {
    showView: false,
    showWarning: false,
    inPutPatientName: "",
    inPutPatientWeight: "",
    outPutPatientName: "",
    outPutPatientWeight: 0,
    inputValue: {
      "tenPerGlucose": "",
      "fiftyPerGlucose": "",
      "twentyPerLipidEmulsion": "",
      "aminoAcid": "",
      "fifteenPerKCL": "",
      "tenPerNaCl": "",
      "microElement": "",
      "waterSoluteVitamins": "",
      "fatSoluteVitamins": "",
      "insulin": ""
    },
    outputValue: {
      "totalLiquid": "",
      "glucoseContain": "",
      "nonProteinCal": "",
      "lipidEmulsionContain": "",
      "aminoAcidContain": "",
      "n": "",
      "finalGlucoseConcentration": "",
      "glucosAmount": "",
      "aminoAcidConcentration": "",
      "thermalNRatio": "",
      "sugarLipidRatio": "",
      "lipidEmulsionAmount": "",
      "osm": "",
      "glucosInsulinRation": "",
      "naCl": "",
      "kCl": "",
      "totalEngergyLow": "",
      "totalEngergyHigh": ""
    },
    warningMessage: {
      "tenPerGlucose": "10%葡萄糖",
      "fiftyPerGlucose": "50%葡萄糖",
      "twentyPerLipidEmulsion": "20%脂肪乳",
      "aminoAcid": "氨基酸",
      "fifteenPerKCL": "15%氯化钾",
      "tenPerNaCl": "10%氯化钠",
      "microElement": "微量元素",
      "waterSoluteVitamins": "水溶性维生素支",
      "fatSoluteVitamins": "脂溶性维生素支",
      "insulin": "胰岛素iu",
      "inPutPatientWeight": "患者体重"
    },
    warningMes:"",
    outputResult: true,
  },

  patientInfoInput: function (e) {
    var value = e.detail.value;
    this.setData({ [e.target.dataset.name]: value });
  },

  inputValue: function (e) {
    var value = e.detail.value;
    this.setData({ ['inputValue.' + e.target.dataset.name]: value });
  },

  reset: function(e) {
    this.setData({showView: false});
    this.setData({ showWarning: false });
    for (var i in this.data.inputValue) {
      var value = "inputValue." + i;
      this.setData({ ['inputValue.' + i]: "" }); 
    }
    this.setData({ inPutPatientName: "" });
    this.setData({ inPutPatientWeight: "" });
  },

  calculate: function(e) {
    this.setData({ outPutPatientName: this.data.inPutPatientName });
    this.setData({ outPatientWeight: this.data.inPutPatientWeight });
    var missingItemArr = [];
    var inputValue = this.data.inputValue;
    var warningMes = "请输入:";
    var totalLiquid = Number(inputValue["tenPerGlucose"]) + Number(inputValue["fiftyPerGlucose"]) + Number(inputValue["twentyPerLipidEmulsion"]) + Number(inputValue["aminoAcid"]) + Number(inputValue["fifteenPerKCL"]) + Number(inputValue["tenPerNaCl"]) + Number(inputValue["microElement"]);
    var lipidEmulsionContain = inputValue["twentyPerLipidEmulsion"] *20 / 100;
    var glucoseContain = inputValue["tenPerGlucose"] / 10 + inputValue["fiftyPerGlucose"] / 100 * 50;
    var nonProteinCal = glucoseContain * 4 + lipidEmulsionContain * 9;
    var aminoAcidContain = inputValue["aminoAcid"] / 200 * 20.65;
    var n = aminoAcidContain / 6.25;
    var finalGlucoseConcentration = glucoseContain / totalLiquid * 100;
    var glucosAmount = glucoseContain * 4 / nonProteinCal * 100;
    var aminoAcidConcentration = aminoAcidContain / totalLiquid * 100;
    var thermalNRatio = nonProteinCal / n;
    var sugarLipidRatio = glucoseContain * 4 / (lipidEmulsionContain * 9);
    var lipidEmulsionAmount = lipidEmulsionContain * 9 / nonProteinCal * 100;
    var naCl = inputValue["tenPerNaCl"] * 10 / 100;
    var kCl = inputValue["fifteenPerKCL"] * 15 / 100;
    var osm = (10 * aminoAcidContain + 5 * glucoseContain + 1.5 * lipidEmulsionContain + 35 * naCl + 27 * kCl) / (totalLiquid / 1000);
    var glucosInsulinRation = glucoseContain / inputValue["insulin"];
    var totalEngergyLow = this.data.inPutPatientWeight * 25;
    var totalEngergyHigh = this.data.inPutPatientWeight * 30;
    this.setData({ "outputValue.totalLiquid": totalLiquid.toFixed(3) });
    this.setData({ "outputValue.glucoseContain": glucoseContain.toFixed(3) });
    this.setData({ "outputValue.lipidEmulsionContain": lipidEmulsionContain.toFixed(3) });
    this.setData({ "outputValue.nonProteinCal": nonProteinCal.toFixed(3) });
    this.setData({ "outputValue.aminoAcidContain": aminoAcidContain.toFixed(3) });
    this.setData({ "outputValue.n": n.toFixed(3) });
    this.setData({ "outputValue.finalGlucoseConcentration": finalGlucoseConcentration.toFixed(3) });
    this.setData({ "outputValue.glucosAmount": glucosAmount.toFixed(3) });
    this.setData({ "outputValue.aminoAcidConcentration": aminoAcidConcentration.toFixed(3) });
    this.setData({ "outputValue.thermalNRatio": thermalNRatio.toFixed(3) });
    this.setData({ "outputValue.glucoseContain": glucoseContain.toFixed(3) });
    this.setData({ "outputValue.sugarLipidRatio": sugarLipidRatio.toFixed(3) });
    this.setData({ "outputValue.lipidEmulsionAmount": lipidEmulsionAmount.toFixed(3) });
    this.setData({ "outputValue.naCl": naCl.toFixed(3) });
    this.setData({ "outputValue.kCl": kCl.toFixed(3) });
    this.setData({ "outputValue.osm": osm.toFixed(3) });
    this.setData({ "outputValue.glucosInsulinRation": glucosInsulinRation.toFixed(3) });
    this.setData({ "outputValue.totalEngergyLow": totalEngergyLow.toFixed(2) });
    this.setData({ "outputValue.totalEngergyHigh": totalEngergyHigh.toFixed(2) });
    for (var i in this.data.outputValue) {
      if (isNaN(this.data.outputValue[i])) {
        this.setData({ outputResult: false });
        break;
      }else {
        this.setData({ outputResult: true });
      }
    }

    if (this.data.inPutPatientWeight == "") {
      missingItemArr.push("inPutPatientWeight");
    }

    for (var i in this.data.inputValue) {
      if (this.data.inputValue[i] == "") {
        missingItemArr.push(i);
      }
    }

    for (var i in missingItemArr) {
      if (this.data.warningMessage.hasOwnProperty(missingItemArr[i])) {
        warningMes = warningMes + this.data.warningMessage[missingItemArr[i]]+ " "
      }
    }

    if (this.data.outputResult && missingItemArr.length === 0) {
      this.setData({ showView: true });
      this.setData({ showWarning: false });
    }else {
      this.setData({ showView: false });
      this.setData({ warningMes: warningMes });
      this.setData({ showWarning: true });
    }

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})