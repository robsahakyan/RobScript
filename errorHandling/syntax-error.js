export class SyntaxError extends Error {
    constructor(message) {
      super(message); 
      this.name = "RobScriptSyntaxError";
    }
  }
  
