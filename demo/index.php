<!doctype html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>freshlaundry demo</title>

    <link rel='stylesheet' href='/dist/freshlaundry.css'>
    <link rel='stylesheet' href='/demo/css/demo.css'>
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

</head>
<body>

<menu>
    <h1>freshlaundry demo</h1>
</menu>

<div id='layout-wrapper'>

    <section>
        <h2>Notes</h2>
        <ul>
            <li><a href='https://github.com/susanBuck/freshlaundry'><i class="fab fa-github"></i>
                    github.com/susanBuck/freshlaundry</a>
            <li>View source to see specifics of how different elements are coded.</li>
        </ul>
    </section>

    <section>
        <h2>Forms</h2>

        <fieldset>
            <label class='required' for='textInput'>Text input</label>
            <input type='text' name='textInput' id='textInput'>
            <span class="fine-print">Some help text.</span>
        </fieldset>

        <fieldset>
            <label for='radio'>Choose one</label>
            <ul class='radios'>
                <li><input type='radio' name='radio' id='optionA'><label for='optionA'>Option A</label>
                <li><input type='radio' name='radio' id='optionB'><label for='optionB'>Option B</label>
            </ul>
        </fieldset>

        <fieldset>
            <label for='checkbox'>Choose</label>
            <ul class='checkboxes'>
                <li><input type='checkbox' name='radio' id='optionC'><label for='optionC'>Option C</label>
                <li><input type='checkbox' name='radio' id='optionD'><label for='optionD'>Option D</label>
            </ul>
        </fieldset>

        <fieldset>
            <label for='textarea'>Description</label>
            <textarea id='textarea'></textarea>
        </fieldset>

        <input type='submit' value='Submit'>

    </section>

    <section>
        <h2>Forms with Validation</h2>
        <form id='demo'>

            <fieldset>
                <label for='city'>City</label>
                <span class='fine-print'>server error</span>
                <input type='text' id='city' name='city' value=''>
            </fieldset>

            <fieldset>
                <label for='state'>State</label>
                <span class='fine-print'>manual error via JS</span>
                <input type='text' id='state' name='state' value=''>
            </fieldset>

            <fieldset>
                <label for='zip'>Zip</label>
                <span class='fine-print'>manual success via JS</span>
                <input type='text' id='zip' name='zip' value=''>
            </fieldset>

            <fieldset>
                <label for='address1'>Address 1</label>
                <span class='fine-print'>manual warning via JS</span>
                <input type='text' name='address1' value=''>
            </fieldset>

            <fieldset>
                <label for='address2'>Address 2</label>
                <span class='fine-print'>manual info via JS</span>
                <input type='text' id='address2' name='address2' value=''>
            </fieldset>

            <fieldset>
                <label for='firstName' class='required'>First name</label>
                <span class='fine-print'>rule: required</span>
                <input type='text' id='firstName' name='firstName' data-rules='required' value='abc'>
            </fieldset>

            <fieldset>
                <label for='email'>Email</label>
                <span class='fine-print'>rule: email</span>
                <input type='email' id='email' name='email' data-rules='email' value='test@gmail.com'>
            </fieldset>

            <fieldset>
                <label for='alphaNum'>Username</label>
                <span class='fine-print'>rule: alphaNum. <br>This can be blank and still be valid since it's not "required"</span>
                <input type='text' id='username' name='username' data-rules='alphaNum' placeholder='abc123'>
            </fieldset>

            <fieldset>
                <label for='creditCard'>Slug</label>
                <span class='fine-print'>rules: required|alphaNum</span>
                <input type='text' id='slug' name='slug' data-rules='required|alphaNum'>
            </fieldset>

            <fieldset>
                <label for='creditCard'>Credit card</label>
                <span class='fine-print'>rule: creditCard</span>
                <input type='text' id='creditCard' name='creditCard' data-rules='creditCard' placeholder='creditCard'
                       value='4242424242424242'>
            </fieldset>

            <fieldset>
                <label for='description'>Description</label>
                <span class='fine-print'>Validation on a textarea</span>
                <textarea name='description' id='description'></textarea>
            </fieldset>

            <button>Submit</button>
        </form>
    </section>

    <section>
        <h2>Widgets</h2>

        <ul>
            <?php $notifyBarTypes = ['default', 'warning', 'success', 'error']; ?>

            <?php foreach ($notifyBarTypes

            as $type): ?>
            <li><a href='javascript:void(0)' class='demoNotifyBar'><?= $type ?> notify Bar</a>
                <?php endforeach; ?>
        </ul>

        <div class='fl-modal-content'>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in pulvinar libero. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in pulvinar libero. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in pulvinar libero. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in pulvinar libero. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in pulvinar libero. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
        </div>

        <ul>
            <li><a href='javascript:void(0)' class='u' id='demoBasicModal'>basic modal example</a>
            <li><a href='javascript:void(0)' class='u' id='demoMoreContentModal'>modal w/ more content</a>
            <li><a href='javascript:void(0)' class='u' id='demoCustomClassModal'>modal w/ a custom class</a>
        </ul>
    </section>

    <section id='buttons'>
        <h2>Buttons</h2>

        <button class='small'>Small Button</button>
        <button>Default Button</button>
        <button class='large'>Large Button</button>

        <input type='submit' value='Submit button'>

        <a href='javascript:void(0)' class='button'>Link button</a>

        <button class='green'>Green button</button>

        <h2>Ajax Buttons</h2>

        <button class='small ajax-loading ajaxButtonDemo'>Small ajax loading button</button>
        <button class='medium ajax-loading ajaxButtonDemo'>Medium ajax loading button</button>
        <button class='large ajax-loading ajaxButtonDemo'>Large ajax loading button</button>
    </section>


    <section>
        <h2>Font Classes</h2>
        <p class='font heading'>.heading</p>
        <p class='font serif'>.serif</p>
        <p class='font sans'>.sans</p>
        <p class='font code'>.code</p>
    </section>

    <section>
        <h2>Typography</h2>

        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <h2>Paragraph</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis vulputate orci, et placerat orci
            porttitor id. Suspendisse semper bibendum eleifend. Nullam gravida tempor elit, et fermentum urna commodo
            nec. Vivamus venenatis orci dui, in suscipit magna laoreet id. Donec et erat libero. Phasellus viverra enim
            vitae justo ultricies, vitae volutpat enim elementum. Duis eleifend risus eget porttitor congue. Maecenas et
            tortor eget mauris condimentum maximus et non ante. Sed eleifend molestie magna vel tincidunt. Integer
            viverra sollicitudin lectus facilisis lobortis.
        </p>

        <h2>Links</h2>
        <p>
            There are 5 different link styles with these options: underline/no-underline, color/black, bold/regular.
        </p>

        <p>
            The styles are indicated by a single letter class, where <code>n = no underline (aka
                                                                           &ldquo;naked&rdquo;)</code>,
            <code>g = grayscale</code>, <code>b = bold</code>, <code>o = outline</code>
            .
        </p>

        <h3>Example combinations:</h3>

        <div class='link-example'>
            <a href='#' class=''>(Default) Colored link with underline</a><br>
            Use in paragraphs when the link is important and it's likely the user will need/want to click it.
            <code>
            <pre>
            &lt;a href='#'>Foobar&lt;/a>
            </pre>
            </code>
        </div>

        <div class='link-example'>
            <a href='#' class='n'>Colored link without underline</a><br>
            Use in menus, footers and other "interface" elements.

            <code>
            <pre>
            &lt;a href='#' class='n'>Foobar&lt;/a>
            </pre>
            </code>
        </div>

        <div class='link-example'>
            <a href='#' class='o'>Outline link</a><br><br>
            Creates a button with a outline, giving it a button-look. Use in interface when the action is important.

            <code>
            <pre>
            &lt;a href='#' class='o'>Foobar&lt;/a>
            </pre>
            </code>
        </div>

        <div class='link-example'>
            <a href='#' class='g'>Grey link</a><br>
            Use in paragraphs when the link is not important or essential to the content. For example, a courtesy link
            to another site.

            <code>
            <pre>
            &lt;a href='#' class='g'>Foobar&lt;/a>
            </pre>
            </code>
        </div>

        <div class='link-example'>
            <a href='#' class='b g'>Bold link</a><br>
            Add <code>b</code> to any of the above combinations for a bold link.

            <code>
            <pre>
            &lt;a href='#' class='b g'>Foobar&lt;/a>
            </pre>
            </code>
        </div>

        <h2>Blockquote</h2>
        <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in pulvinar libero. Pellentesque habitant
            morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </blockquote>

        <h2>Short list</h2>
        <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
        </ul>

        <h2>Long list</h2>
        <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis vulputate orci, et placerat orci
                porttitor id. Suspendisse semper bibendum eleifend. Nullam gravida tempor elit, et fermentum urna
                commodo nec.
            </li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis vulputate orci, et placerat orci
                porttitor id. Suspendisse semper bibendum eleifend. Nullam gravida tempor elit, et fermentum urna
                commodo nec.
            </li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis vulputate orci, et placerat orci
                porttitor id. Suspendisse semper bibendum eleifend. Nullam gravida tempor elit, et fermentum urna
                commodo nec.
            </li>
        </ul>

    </section>

    <section>
        <h2>Tables</h2>

        <table>
            <thead>
            <tr>
                <th data-field="id">Name</th>
                <th data-field="name">Item Name</th>
                <th data-field="price">Item Price</th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
            </tr>
            <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
            </tr>
            <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
            </tr>
            </tbody>
        </table>
    </section>

</div> <!-- /.layout-wrapper -->

<footer>
    Footer
</footer>

<script src='/node_modules/jquery/dist/jquery.js'></script>
<script src='/dist/freshlaundry.js'></script>
<script src='/demo/demo.js'></script>

</body>
</html>
