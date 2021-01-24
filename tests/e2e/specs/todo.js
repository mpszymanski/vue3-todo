describe("Tasks list interactions", () => {
  it("can use to do list", () => {
    cy.visit("/", {
      // Workaround for fetch API
      onBeforeLoad(win) {
        cy.stub(win, "fetch")
          .withArgs("/data/tasks.json")
          .resolves({
            ok: true,
            json: () => ({
              data: []
            })
          });
      }
    });

    const taskName = "Task name";

    // Task creating
    cy.get('[data-test="task-input"]').type(taskName);
    cy.get('[data-test="task-form"]').submit();
    cy.get('[data-test="task"]').should("contains.text", taskName);

    // Task toggling
    cy.get('[data-test="task"]')
      .find('[data-test="task-is-not-done"]')
      .should("be.visible");

    cy.get('[data-test="task"]').click();

    cy.get('[data-test="task"]')
      .find('[data-test="task-is-done"]')
      .should("be.visible");

    cy.get('[data-test="task"]').click();

    cy.get('[data-test="task"]')
      .find('[data-test="task-is-not-done"]')
      .should("be.visible");

    // Task removing
    cy.get('[data-test="remove-task-button"]').click();
    cy.get('[data-test="tasks-list"]').should("be.empty");
  });
});
