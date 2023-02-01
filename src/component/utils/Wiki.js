import React from 'react';
import "../../main.css";

export default function Wiki() {
  return (
    <div>
  <div className="uk-section section-sub-nav uk-padding-remove">
    <div className="uk-container">
      <div uk-grid="">
        <div className="uk-width-2-3@m pt-3">
          <h3>SOS3D Explained</h3>
        </div>
        <div className="uk-width-1-3@m">
          <div className="uk-margin">
            <form className="uk-search uk-search-default">
              <a href="#" className="uk-search-icon-flip" uk-search-icon="" />
              <input
                id="autocomplete"
                className="uk-search-input"
                type="search"
                autoComplete="off"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="border-top" />
    </div>
  </div>
  <div className="uk-section uk-section-small uk-padding-remove-bottom section-content">
    <div className="uk-container uk-position-relative">
      <div uk-grid="">
        <div className="uk-width-3-4@m">
          <article className="uk-article">
            <header>
              <div className="uk-margin-bottom font-bold">
                Jump to a section below
              </div>
              <div className="author-box uk-card">
                <div className="uk-card-header uk-padding-remove">
                  <div
                    className="uk-grid-small uk-flex-middle  uk-position-relative"
                    uk-grid=""
                  >
                    <div className="">
                      <ul className='flex flex-col gap-5'>
                        <li><a href="#game">Game overview</a></li>
                        <li><a href="#testnet">Playing on Testnet</a></li>
                        <li> <a href="#rules">Rules of the game</a></li>
                        <li disabled > <a href="">How to Benefit</a></li>
                        <li disabled>   <a href="">Referrals and Vanity</a> </li>
                        <li disabled> <a href="">Random airdrops</a> </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>
            </header>
            <div className="entry-content uk-margin-medium-top">
              <h2 id="game">Game Overview</h2>
              <p>
               This is a game in which the grand prize winner is the last person to purchase a key before the
                countdown clock runs down to zero. §very key purchase, the buyer becomes the new holder of the "private
                keys" and additional time is added to the countdown clock.

                When the clock reaches zero, the pot is diwied up with the final buyer who holds the private keys receiving
                the lion share of SOS but with substantial portions going both to all other player participants and as
                dividends paid to SOS3D holders. The specific way the SOS is divided between the winner, the SOS
                participants and the SOS3D holders is based of rules and percentages set in the smart contract.

                To understand the mechanics and incentives of the game, check out Reddit's The Button @ experiment for

                insights. SOS3D is essentially a lottery where the house, and the house advantage goes directly to
                players.
              </p>
              {/* 
              <h2 id="testnet">Playing on Testnet</h2>
              <p>

                Before releasing the game to play with real Ethereum, we have launched a testnet version using fake
                ETH Goerli testnet. Please note that this version is not using real ETH, but instead uses pretend ETH given to you for free
                by a test faucet.

                Instructions for configuring and playing on the testnet

                t
                1. Open up metamask, and in the top left corner change your network to "Custom RPC" and insert

                ne . teamjust-io/ as the URL
                2. Visit our test ETH faucet @ in your web browser for a free 100 test eth
                3. Play SOS3D with your test SOS on the play page ¢

                Now you can get started playing, Read below to better understand the game!
              </p>
              <h4 id='rules'>Rules of the game</h4>
            <div className="">The rules of the game are both simple and fun</div>
              <ol className="ol-pretty uk-list-large">
                <li>Click your team name to open the Team Menu.</li>
                <li>
                  Purchase one or more keys which immediately makes you the "private key owner” until another
                  person takes the keys from you.
                </li>
                <li>
                 Every key purchased resets the time on the countdown clock to 90 seconds and very slightly increases
                 the key price.
                </li>
                <li>
                 Each time a new key is purchased, all key holders receive a portion of that sale proportionate to the
                 number of keys held.

                  You can recruit other participants to the game and receive an additional share of every key they
                  purchase, at no cost to them!
                </li>
                <li>The round officially ends when the countdown clock reaches zero.</li>
              </ol>
              <div className="">
                At the end of the round, the SOS pot is distributed between several parties with the winner (private
                keys owner) receiving half, and the rest of the players each receiving a share of the pot proportional
                to the number of keys they held. In addition, a percentage of the pot is paid to SOS3D holders as
                dividends. The specific split of the pot (who gets what) is determined by the contract, when the
                 players purchase their last key.
              </div>
              <div className="">
                Once the keys are sold and the pot has been fully distributed, a new scam (round) begins anew! Keep
                in mind that a portion of the pot is withheld to help kick off the next round
              </div>
              <h2 id="teams">The Teams</h2>
              <div className="">
                In SOS3D, there are four major teams that players can associate themselves with. Every time you
                purchase an additional key, you can select one of these four teams. The team you select represents both
                how you want your buy-in dividends shared as well as the pot distribution if your team wins at the
                end of the round once the timer runs out. In particular, each team is explained below:
              </div>
              <p>
                @ snake - "Trickle down Divinomics". Your key buy-in price has a fair share distributed to all players and
                to SOS3D holders. After a round ends, a larger portion of the pot is distributed to SOS3D holders as
                dividends. snakes push for distributing more of the pot as dividends to other players and to SOS3D
                holders.
              </p>
              <p>
               © Whale - "Feed on the greed of others". After a round ends, a larger portion of the pot is held for the
                next round and less given as dividends to players and holders. Whales push for keeping more of
                the SOS around in the game for future rounds rather than distributing as dividends.
              </p>
              <p>
                © Bull - "Break upwards, never stagnate”. After a round ends, a larger portion of the pot is distributed
                to SOS holders as dividends. Bulls push for distributing more of the pot as dividends to other
                players and a smaller amount to SOS3D holders than snakes.
              </p>
              <p>
                © Bear - "Stand alone, fight alone". Your key buy-in price does not go to SOS3D and instead is distributed
                mostly to other SOS players. After a round ends, much less of the pot will be distributed to SOS3D
                holders as dividends. Bears push for distributing dividends to other players and to the winner.
              </p>
               */}     
            </div>
          </article>
        </div>


      </div>
    </div>
  </div>
  <footer
    id="footer"
    className="uk-section uk-margin-large-top uk-section-xsmall uk-text-small uk-text-muted border-top"
  >
    <div className="uk-container">
      <div className="uk-child-width-1-2@m uk-text-center" uk-grid="">
        <div className="uk-text-right@m">
          <a
            href="#"
            className="uk-icon-link uk-margin-small-right"
            uk-icon="icon: facebook"
          />
          <a
            href="#"
            className="uk-icon-link uk-margin-small-right"
            uk-icon="icon: google"
          />
          <a
            href="#"
            className="uk-icon-link uk-margin-small-right"
            uk-icon="icon: vimeo"
          />
          <a
            href="#"
            className="uk-icon-link uk-margin-small-right"
            uk-icon="icon: instagram"
          />
          <a
            href="#"
            className="uk-icon-link uk-margin-small-right"
            uk-icon="icon: twitter"
          />
          <a
            href="#"
            className="uk-icon-link uk-margin-small-right"
            uk-icon="icon: youtube"
          />
        </div>
        <div className="uk-flex-first@m uk-text-left@m">
          <p className="uk-text-small">Copyright 2023 Powered SOS3D</p>
        </div>
      </div>
    </div>
  </footer>
  <div id="offcanvas" uk-offcanvas="flip: true; overlay: true">
    <div className="uk-offcanvas-bar">
      <a
        className="uk-margin-small-bottom uk-logo uk-text-uppercase"
        href="index.html"
      >
        <span className="uk-margin-small-right" uk-icon="icon: lifesaver" />{" "}
        Knowledge
      </a>
      <ul className="uk-nav uk-nav-default uk-text-uppercase">
        <li>
          <a href="index.html">Home</a>
        </li>
        <li className="uk-parent">
          <a href="article.html">Article</a>
          <ul className="uk-nav-sub">
            <li>
              <a href="article.html">Scrollspy</a>
            </li>
            <li>
              <a href="article-narrow.html">Narrow</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="faq.html">Faq</a>
        </li>
        <li>
          <a href="contact.html">Contact</a>
        </li>
        <li>
          <a href="components.html">Components</a>
        </li>
      </ul>
      <a
        href="contact.html"
        className="uk-button uk-button-small uk-button-default uk-width-1-1 uk-margin"
      >
        Support
      </a>
      <div className="uk-width-auto uk-text-center">
        <a
          href="#"
          className="uk-icon-link uk-margin-small-right"
          uk-icon="icon: facebook"
        />
        <a
          href="#"
          className="uk-icon-link uk-margin-small-right"
          uk-icon="icon: google"
        />
        <a
          href="#"
          className="uk-icon-link uk-margin-small-right"
          uk-icon="icon: twitter"
        />
      </div>
    </div>
  </div>

    </div>
  )
}
