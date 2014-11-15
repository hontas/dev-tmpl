describe("First test", function() {
	it("should fail", function() {
		var is = sinon.stub().returns(true);
		expect(is()).to.be.false;
	});
});
