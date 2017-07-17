/* a DRY way to run same specs with different args */
function runSpecsByTarget(palindromConnection, target) {
  var model = {
    name: 'Juicy'
  };
  describe('Other events', function() {
    var palindrom, currentObject;
    before(function waitForHTMLImportsAndPalindromConnect(done) {
      setTimeout(function() {
        chai.use(palindromChaiPlugin);
        palindrom = palindromConnection.palindrom;
        initPalindrom(palindrom, model);
        currentObject = palindrom.obj;
        done();
      }, 100);
    });

    describe('patch-received event', function() {
      it(`fire patch-received when a patch is received`, function() {
        const patchReceivedListener = sinon.spy();
        target.addEventListener('patch-received', patchReceivedListener);

        palindromChange(palindrom, [
          operationObject('replace', '/name', 'Frédéric')
        ]);

        expect(patchReceivedListener).to.have.been.called;

        const patch = patchReceivedListener.getCall(0).args[0].detail;
        // first two are OT
        expect(patch[2]).to.deep.equal(
          operationObject('replace', '/name', 'Frédéric')
        );
      });
    });
    describe('patch-applied event', function() {
      it(`fire patchApplied when a patch is applied`, function() {
        const patchAppliedListener = sinon.spy();
        target.addEventListener('patch-applied', patchAppliedListener);

        palindromChange(palindrom, [
          operationObject('replace', '/name', 'Chopin')
        ]);

        expect(patchAppliedListener).to.have.been.called;

        const detail = patchAppliedListener.getCall(0).args[0].detail;
        const patch = detail.patch;
        const results = detail.results;

        expect(patch).to.deep.equal([
          operationObject('replace', '/name', 'Chopin')
        ]);
        expect(results[0].removed).to.equal('Frédéric');
      });
    });
    describe(`patch-sent event`, function() {
      it('fire patch-sent when a patch is issued', function() {
        const patchSentListener = sinon.spy();
        target.addEventListener('patch-sent', patchSentListener);

        currentObject.name = 'Arnold';

        expect(patchSentListener).to.have.been.called;

        expect(patchSentListener).to.have.been.calledWithPatch(
          operationObject('replace', '/name', 'Arnold')
        );
      });
    });
    describe(`local-change event`, function() {
      it('fire patch-sent when a patch is issued', function() {
        const localChangeListener = sinon.spy();
        target.addEventListener('local-change', localChangeListener);

        currentObject.name = 'Amy';

        expect(localChangeListener).to.have.been.called;

        const detail = localChangeListener.getCall(0).args[0].detail;
        expect(detail).to.deep.equal([
          operationObject('replace', '/name', 'Amy')
        ]);
      });
    });
  });
}
