var INDEX, IS_MATH, IS_NUMBER, IS_SPECIAL, LAST_TOKEN, MATH_INDEX, MATH_TOKENS, MATH_TOKENS_LIST, NUMBER_INDEX, OUTPUT, SPECIAL_INDEX, SPECIAL_TOKENS, SPECIAL_TOKENS_LIST, TOKENS, TOKENS_CAPS, TOKENS_CAPS_LIST, TOKENS_LIST, USER_INPUT, USER_TOKENS;
TOKENS = "abcdefghijklmnopqrstuvwxyz";
TOKENS_CAPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
SPECIAL_TOKENS = "_.!?,:()@#";
MATH_TOKENS = "$+-*/=%^<>";

document.getElementById("Loading").innerText = "";
var darkModeBool = false;

function run() {
  document.getElementById("Loading").innerText = "Loading...";
    USER_INPUT = String(document.getElementById("codeInput").innerText);
    USER_TOKENS = USER_INPUT.split(/(\d|\D)/);

    for(let i = 0; i < USER_TOKENS.length; i++){
        USER_TOKENS = USER_TOKENS.filter(token => token !== "");
    }

    INDEX = 0;
    LAST_TOKEN = null;
    TOKENS_LIST = [...TOKENS];
    TOKENS_CAPS_LIST = [...TOKENS_CAPS];
    SPECIAL_TOKENS_LIST = [...SPECIAL_TOKENS];
    MATH_TOKENS_LIST = [...MATH_TOKENS];
    IS_NUMBER = false;
    NUMBER_INDEX = 0;
    IS_SPECIAL = false;
    SPECIAL_INDEX = 0;
    IS_MATH = false;
    MATH_INDEX = 0;
    OUTPUT = "";

    for (var token, _pj_c = 0, _pj_a = USER_TOKENS, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
        token = _pj_a[_pj_c];
      
        if (IS_NUMBER) {
          if (LAST_TOKEN === "+") {
            if (token === "+") {
              NUMBER_INDEX += 1;
              LAST_TOKEN = null;
            } else {
              if (token === "V" || token === "v") {
                NUMBER_INDEX += 5;
                LAST_TOKEN = null;
              }
            }
          } else {
            if (LAST_TOKEN === "-") {
              if (token === "-") {
                NUMBER_INDEX -= 1;
                LAST_TOKEN = null;
              } else {
                if (token === "V" || token === "v") {
                  NUMBER_INDEX -= 5;
                  LAST_TOKEN = null;
                }
              }
            } else {
              if (LAST_TOKEN === null) {
                if (token === "+") {
                  LAST_TOKEN = "+";
                } else {
                  if (token === "-") {
                    LAST_TOKEN = "-";
                  } else {
                    if (token === ")") {
                      LAST_TOKEN = null;
                      OUTPUT += NUMBER_INDEX.toString();
                      NUMBER_INDEX = 0;
                      IS_NUMBER = false;
                    }
                  }
                }
              }
            }
          }
      
          continue;
        }
      
        if (IS_SPECIAL) {
          if (LAST_TOKEN === "+") {
            if (token === "+") {
              SPECIAL_INDEX += 1;
              LAST_TOKEN = null;
            } else {
              if (token === "V" || token === "v") {
                SPECIAL_INDEX += 5;
                LAST_TOKEN = null;
              }
            }
          } else {
            if (LAST_TOKEN === "-") {
              if (token === "-") {
                SPECIAL_INDEX -= 1;
                LAST_TOKEN = null;
              } else {
                if (token === "V" || token === "v") {
                  SPECIAL_INDEX -= 5;
                  LAST_TOKEN = null;
                }
              }
            } else {
              if (LAST_TOKEN === null) {
                if (token === "+") {
                  LAST_TOKEN = "+";
                } else {
                  if (token === "-") {
                    LAST_TOKEN = "-";
                  } else {
                    if (token === ")") {
                      LAST_TOKEN = null;
                      OUTPUT += SPECIAL_TOKENS_LIST[SPECIAL_INDEX];
                      SPECIAL_INDEX = 0;
                      IS_SPECIAL = false;
                    }
                  }
                }
              }
            }
          }
      
          continue;
        }
      
        if (IS_MATH) {
          if (LAST_TOKEN === "+") {
            if (token === "+") {
              MATH_INDEX += 1;
              LAST_TOKEN = null;
            } else {
              if (token === "V" || token === "v") {
                MATH_INDEX += 5;
                LAST_TOKEN = null;
              }
            }
          } else {
            if (LAST_TOKEN === "-") {
              if (token === "-") {
                MATH_INDEX -= 1;
                LAST_TOKEN = null;
              } else {
                if (token === "V" || token === "v") {
                  MATH_INDEX -= 5;
                  LAST_TOKEN = null;
                }
              }
            } else {
              if (LAST_TOKEN === null) {
                if (token === "+") {
                  LAST_TOKEN = "+";
                } else {
                  if (token === "-") {
                    LAST_TOKEN = "-";
                  } else {
                    if (token === ")") {
                      LAST_TOKEN = null;
                      OUTPUT += MATH_TOKENS_LIST[MATH_INDEX];
                      MATH_INDEX = 0;
                      IS_MATH = false;
                    }
                  }
                }
              }
            }
          }
      
          continue;
        }
      
        if (LAST_TOKEN !== null) {
          if (LAST_TOKEN === "+") {
            if (token === "+") {
              INDEX += 1;
              LAST_TOKEN = null;
            } else {
              if (token === "V" || token === "v") {
                INDEX += 5;
                LAST_TOKEN = null;
              } else {
                if (token === "X" || token === "x") {
                  INDEX += 10;
                  LAST_TOKEN = null;
                } else {
                  if (token === "T" || token === "t") {
                    INDEX += 20;
                    LAST_TOKEN = null;
                  }
                }
              }
            }
          } else {
            if (LAST_TOKEN === "-") {
              if (token === "-") {
                INDEX -= 1;
                LAST_TOKEN = null;
              } else {
                if (token === "V" || token === "v") {
                  INDEX -= 5;
                  LAST_TOKEN = null;
                } else {
                  if (token === "X" || token === "x") {
                    INDEX -= 10;
                    LAST_TOKEN = null;
                  } else {
                    if (token === "T" || token === "t") {
                      INDEX -= 20;
                      LAST_TOKEN = null;
                    }
                  }
                }
              }
            } else {
              if (LAST_TOKEN === "^") {
                if (token === "P" || token === "p") {
                  OUTPUT += TOKENS_CAPS_LIST[INDEX - 1];
                }
      
                LAST_TOKEN = null;
              } else {
                if (LAST_TOKEN === "n") {
                  if (token === "(") {
                    LAST_TOKEN = "n(";
                  }
                } else {
                  if (LAST_TOKEN === "n(") {
                    IS_NUMBER = true;
      
                    if (token === "+") {
                      LAST_TOKEN = "+";
                    }
                  } else {
                    if (LAST_TOKEN === "s") {
                      if (token === "(") {
                        LAST_TOKEN = "s(";
                      }
                    } else {
                      if (LAST_TOKEN === "s(") {
                        IS_SPECIAL = true;
      
                        if (token === "+") {
                          LAST_TOKEN = "+";
                        }
                      } else {
                        if (LAST_TOKEN === "m") {
                          if (token === "(") {
                            LAST_TOKEN = "m(";
                          }
                        } else {
                          if (LAST_TOKEN === "m(") {
                            IS_MATH = true;
      
                            if (token === "+") {
                              LAST_TOKEN = "+";
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (LAST_TOKEN === null) {
            if (token === "+") {
              LAST_TOKEN = "+";
            } else {
              if (token === "-") {
                LAST_TOKEN = "-";
              } else {
                if (token === "P" || token === "p") {
                  OUTPUT += TOKENS_LIST[INDEX - 1];
                } else {
                  if (token === "^") {
                    LAST_TOKEN = "^";
                  } else {
                    if (token === "n" || token === "N") {
                      LAST_TOKEN = "n";
                    } else {
                      if (token === "s" || token === "S") {
                        LAST_TOKEN = "s";
                      } else {
                        if (token === "m" || token === "M") {
                          LAST_TOKEN = "m";
                        } else {
                          if (token === "_") {
                            OUTPUT += " ";
                            LAST_TOKEN = null;
                          } else {
                            if (token === "c") {
                              INDEX = 0;
                              LAST_TOKEN = null;
                            } else {
                              if (token === "\n") {
                                INDEX = 0;
                                OUTPUT += "\n";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }
    document.getElementById("Loading").innerText = "";
    document.getElementById("codeOutput").innerText = OUTPUT;
}

function darkMode() {
  document.body.classList.toggle('darkmode');
  if (darkModeBool) {
    darkModeBool = false;
    document.getElementById("ModeToggle").innerText = "Dark Mode";
  }
  else {
    darkModeBool = true;
    document.getElementById("ModeToggle").innerText = "Light Mode";
  }
}