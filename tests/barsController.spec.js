let chai = require('chai'),
    expect = chai.expect,
    barsController = require('../controllers/barsController');

describe('BarsController', function() {
  it ("getYelpToken() should return access token if it doesn't fail", function() {
    expect(barsController.getYelpToken()).to.equal("B_3lUOtk8TkM07-LrbqW0DZJ7Eb2jxTavtQCQ6zVSQ-7xi12BRQTsARBsRUE62a2uf61wO-9uc4S15z5Pk_Q7BHH80Vbi8lumm3a4AK3dBckUYXg2kpR8W7icng4WXYx");
  });
});
